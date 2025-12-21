import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import crypto from 'crypto';

type ReqQuery = { token: string; email: string };

export const checkChangePassToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { token, email } = req?.query as ReqQuery;

    if (!token || !email) {
        Logger.warn('Missing required fields', 'ChangePassword');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');
        const baseToken = await prisma.passwordReset.findUnique({ where: { token: hashToken } });

        if (!baseToken) {
            Logger.info('Token not found', 'ChangePassword');
            return res.status(400).json({ message: 'Token not found' });
        }

        if (baseToken.expiresAt < new Date()) {
            await prisma.passwordReset.deleteMany({ where: { token: hashToken } });
            Logger.warn('Token expired', 'ChangePassword');
            return res.status(400).json({ message: 'Token expired' });
        }

        const user = await prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            Logger.warn('User not found', 'ChangePassword');
            return res.status(400).json({ message: 'User not found' });
        }

        req.user = user;
        req.auth = {
            changePassToken: hashToken,
        };

        next();
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'changeCheckPassToken');
        return res.status(500).json({ message: 'Server error' });
    }
};
