import 'dotenv/config';
import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken, hashRefreshToken } from '../service/createTokens';
import { createRefreshCookie } from '../service/createRefreshCookie';

type RequestBody = { [key in 'email' | 'password']: string };

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: RequestBody = req?.body;
    const refreshExpIn = process.env.JWT_REFRESH_EXP_IN;

    if (!refreshExpIn) {
        Logger.error('JWT_REFRESH_EXP_IN in env is not set', 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }

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

        const accessToken = createAccessToken({ id: user.id, email: user.email });

        const URT = createRefreshToken();
        const refreshHash = hashRefreshToken(URT);

        await prisma.sessions.create({
            data: {
                user: { connect: { id: user.id } },
                refreshHash,
                userAgent: req.get('user-agent'),
                ip: req.ip,
                expiresAt: new Date(Date.now() + Number(refreshExpIn)), // 30 дней
            },
        });

        createRefreshCookie(res, URT, refreshExpIn);

        Logger.success(`${email} logged in successfully`, 'loginUser');
        return res.status(200).json({ message: 'User logged in successfully', token: accessToken });
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }
};
