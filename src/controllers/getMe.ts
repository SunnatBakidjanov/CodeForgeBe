import { Response } from 'express';
import { AccessToken, AuthenticatedRequest } from '../types/request';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import { clearAccessCookie } from '../service/createAccessCookie';
import { clearRefreshCookie } from '../service/createRefreshCookie';

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
    const access = req.auth?.accessToken as AccessToken;

    if (!access?.email) {
        Logger.warn('Missing required fields', 'getMe');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: access.email }, select: { id: true, email: true, name: true, updatedAt: true, isLocalAuth: true } });

        if (!user) {
            clearAccessCookie(res);
            clearRefreshCookie(res);
            return res.status(401).json({ message: 'USER_NOT_FOUND', type: 'user' });
        }

        Logger.info('User found', 'getMe');
        return res.status(200).json({ message: 'Sueccess', userData: { id: user.id, email: user.email, name: user.name, uptadetAt: user.updatedAt } });
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'getMe');
        return res.status(500).json({ message: 'Server error', type: 'user' });
    }
};
