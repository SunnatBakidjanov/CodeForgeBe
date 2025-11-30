import 'dotenv/config';
import { Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken, hashRefreshToken } from '../service/createTokens';
import { createRefreshCookie } from '../service/createRefreshCookie';
import { refreshCreateSession } from '../service/refreshCreateSession';
import { AuthenticatedRequest } from '../types/request';

type RequestBody = { [key in 'email' | 'password']: string };

export const loginUser = async (req: AuthenticatedRequest, res: Response) => {
    const { email, password }: RequestBody = req?.body;
    const refreshExpIn = req.user?.refreshExpIn as string;

    if (!email || !password) {
        Logger.warn('Email or password is missing', 'loginUser');
        return res.status(400).json({ message: 'Email or password is missing' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            Logger.warn(`${email} not found`, 'loginUser');
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password as string);

        if (!passwordMatch) {
            Logger.warn(`${email} incorrect password`, 'loginUser');
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        refreshCreateSession(req, res, user.id, refreshExpIn);

        Logger.success(`${email} logged in successfully`, 'loginUser');

        const accessToken = createAccessToken({ id: user.id, email: user.email });
        return res.status(200).json({ message: 'User logged in successfully', token: accessToken });
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }
};
