import { Response } from 'express';
import { AccessToken, AuthenticatedRequest } from '../types/request';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import { clearAccessCookie } from '../service/createAccessCookie';
import { clearRefreshCookie } from '../service/createRefreshCookie';
import { readCookie } from '../utils/readCookie';
import { verifyAccessToken } from '../service/createTokens';
import jwt from 'jsonwebtoken';

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
    const refreshToken = readCookie(req, 'REFRESH');
    const guestCookie = readCookie(req, 'GUEST');
    const accessToken = readCookie(req, 'ACCESS');

    if (refreshToken) {
        let decodedAccess;

        if (!accessToken) {
            Logger.warn('Access token not found', 'getMe');
            return res.status(401).json({ message: 'INVALID_ACCESS_TOKEN' });
        }

        try {
            const decodedToken = verifyAccessToken(accessToken);
            decodedAccess = decodedToken as AccessToken;

            Logger.info('Access token verified', 'getMe');
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                Logger.info('Access token expired', 'getMe');
                return res.status(401).json({ message: 'INVALID_ACCESS_TOKEN' });
            }

            clearAccessCookie(res);
            clearRefreshCookie(res);
            Logger.warn('Access token invalid', 'getMe');
            return res.status(403).json({ message: 'INVALID_ACCESS_TOKEN' });
        }

        try {
            const user = await prisma.user.findUnique({ where: { email: decodedAccess.email }, select: { id: true, email: true, name: true, updatedAt: true, isLocalAuth: true } });

            if (!user) {
                clearAccessCookie(res);
                clearRefreshCookie(res);
                return res.status(401).json({ message: 'USER_NOT_FOUND', type: 'user' });
            }

            Logger.info('User found', 'getMe');
            return res.status(200).json({ message: 'Sueccess', userData: { id: user.id, email: user.email, name: user.name, uptadetAt: user.updatedAt }, type: 'user' });
        } catch (error) {
            Logger.error(`Server Error\n ${(error as Error).message}`, 'getMe');
            return res.status(500).json({ message: 'Server error', type: 'user' });
        }
    }

    clearAccessCookie(res);

    if (!guestCookie) {
        const guestId = Date.now().toString();
        const cookieMaxAge = 1000 * 60 * 60 * 24 * 7; // 7 days

        res.cookie('CFG', guestId, {
            httpOnly: false,
            secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
            sameSite: 'lax',
            maxAge: cookieMaxAge,
        });

        Logger.success(`Guest ${guestId} created`, 'createGuest');
        return res.status(201).json({ message: 'Guest created successfully', type: 'guest' });
    }

    Logger.success('Guest found', 'getMe');
    return res.status(200).json({ message: 'Guest found', type: 'guest' });
};
