import { Request, Response } from 'express';
import { hashRefreshToken, createRefreshToken } from './createTokens';
import { createRefreshCookie } from './createRefreshCookie';
import { prisma } from '../db/prisma';
import { Logger } from '../utils/Logger';
import { readCookie } from '../utils/readCookie';
import { createAccessCookie } from './createAccessCookie';
import { createAccessToken } from './createTokens';

type FnType = (req: Request, res: Response, user: { id: string; email: string; name: string }, refreshExpIn: string) => Promise<void>;

export const createSession: FnType = async (req, res, user, refreshExpIn) => {
    const refreshCookie = readCookie(req, 'REFRESH');

    if (refreshCookie) {
        const hash = hashRefreshToken(refreshCookie);

        try {
            await prisma.sessions.delete({ where: { refreshHash: hash } });
        } catch (error) {
            Logger.warn(`Session not found`, 'refreshCreateSession');
        }
    }

    const URT = createRefreshToken();
    const refreshHash = hashRefreshToken(URT);

    await prisma.sessions.create({
        data: {
            user: { connect: { id: user?.id } },
            refreshHash,
            expiresAt: new Date(Date.now() + Number(refreshExpIn)),
            ip: req.ip,
            userAgent: req.headers['user-agent'] as string,
        },
    });

    res.clearCookie('CFG', {
        httpOnly: false,
        secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
        sameSite: 'lax',
        path: '/',
    });

    const accessToken = createAccessToken({ id: user.id, email: user.email, name: user.name });
    createAccessCookie(res, accessToken);

    createRefreshCookie(res, URT, refreshExpIn);

    Logger.info('Session created', 'refreshCreateSession');
};
