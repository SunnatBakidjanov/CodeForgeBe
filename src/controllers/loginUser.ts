import 'dotenv/config';
import { Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';
import { createAccessToken } from '../service/createTokens';
import { createSession } from '../service/createSession';
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

        if (!user || user.password === null) {
            Logger.warn(`${email} not found`, 'loginUser');
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            Logger.warn(`${email} incorrect password`, 'loginUser');
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        await prisma.user.update({ where: { email }, data: { provider: 'local' } });

        await createSession(req, res, user.id, refreshExpIn);

        Logger.success(`${email} logged in successfully`, 'loginUser');

        const accessToken = createAccessToken({ id: user.id, email: user.email, name: user.name });
        return res.status(200).json({ message: 'User logged in successfully', token: accessToken });
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }
};
