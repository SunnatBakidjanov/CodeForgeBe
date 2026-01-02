import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { readCookie } from '../utils/readCookie';
import { prisma } from '../db/prisma';
import { hashRefreshToken } from '../service/createTokens';
import { checkAccessToken } from '../middleware/checkAccessToken';

export const createGuest = async (req: Request, res: Response) => {
    const guest = readCookie(req, 'GUEST');
    const refreshToken = readCookie(req, 'REFRESH');

    if (refreshToken) {
        Logger.warn('User already logged in', 'createGuest');

        if (guest) {
            res.clearCookie('CFG', {
                httpOnly: false,
                secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
                sameSite: 'lax',
                path: '/',
            });
        }

        checkAccessToken(req, res, undefined);

        return res.status(200).json({ message: 'User already logged in', type: 'user' });
    }

    if (!guest) {
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

    Logger.info('Guest already exists', 'createGuest');
    return res.status(200).json({ message: 'Guest already exists', type: 'guest' });
};
