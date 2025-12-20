import { Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AuthenticatedRequest } from '../types/request';

type ReqBody = { password: string };
type ReqQuery = { token: string; email: string };

export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
    const { password } = req.body as ReqBody;
    const { token, email } = req?.query as ReqQuery;

    if (!token || !password || !email) {
        Logger.warn('Missing required fields', 'ChangePassword');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');
        const baseToken = await prisma.passwordReset.findUnique({ where: { token: hashToken } });

        if (!baseToken) {
            Logger.warn('Token not found', 'ChangePassword');
            return res.status(400).json({ message: 'Token not found' });
        }

        if (baseToken.expiresAt < new Date()) {
            await prisma.passwordReset.deleteMany({ where: { token: token } });
            Logger.warn('Token expired', 'ChangePassword');
            return res.status(400).json({ message: 'Token expired' });
        }

        const user = await prisma.user.findUnique({ where: { email: email } });

        if (!user) {
            Logger.warn('User not found', 'ChangePassword');
            return res.status(400).json({ message: 'User not found' });
        }

        const HASH_ROUNDS = req.hashRounds as number;
        const hashPassword = await bcrypt.hash(password, HASH_ROUNDS);
        await prisma.user.update({ where: { email }, data: { password: hashPassword } });
        await prisma.passwordReset.deleteMany({ where: { token: hashToken } });

        Logger.success('Password changed successfully', 'ChangePassword');
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'ChangePassword');
        return res.status(500).json({ message: 'Internal server error' });
    }
};
