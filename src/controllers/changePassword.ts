import { Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';
import { AuthenticatedRequest } from '../types/request';

type ReqBody = { password: string };

export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
    const { password } = req.body as ReqBody;
    const hashToken = req?.auth?.changePassToken;
    const email = req?.user?.email;

    if (!hashToken || !password || !email) {
        Logger.warn('Missing required fields', 'ChangePassword');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const HASH_ROUNDS = req.hashRounds as number;
        const hashPassword = await bcrypt.hash(password, HASH_ROUNDS);
        await prisma.user.update({ where: { email }, data: { password: hashPassword } });

        await prisma.passwordReset.delete({ where: { token: hashToken } });

        Logger.success('Password changed successfully', 'ChangePassword');
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'ChangePassword');
        return res.status(500).json({ message: 'Internal server error' });
    }
};
