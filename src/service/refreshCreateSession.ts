import { Request, Response } from 'express';
import { hashRefreshToken, createRefreshToken } from './createTokens';
import { createRefreshCookie } from './createRefreshCookie';
import { prisma } from '../db/prisma';
import { Logger } from '../utils/Logger';

type FnType = (req: Request, res: Response, userId: string, refreshExpIn: string) => Promise<void>;

export const refreshCreateSession: FnType = async (req, res, userId, refreshExpIn) => {
    const refreshCookie = req.cookies.URT;
    const refreshCookieHash = hashRefreshToken(refreshCookie);

    const session = await prisma.sessions.findFirst({ where: { refreshHash: refreshCookieHash } });

    if (session) {
        const URT = createRefreshToken();
        const refreshHash = hashRefreshToken(URT);

        await prisma.sessions.update({
            where: { id: session.id },
            data: {
                user: { connect: { id: userId } },
                refreshHash,
                expiresAt: new Date(Date.now() + Number(refreshExpIn)),
            },
        });

        createRefreshCookie(res, refreshHash, refreshExpIn);

        Logger.info('Session found and updated', 'refreshCreateSession');
    } else {
        const URT = createRefreshToken();
        const refreshHash = hashRefreshToken(URT);

        await prisma.sessions.create({
            data: {
                user: { connect: { id: userId } },
                refreshHash,
                expiresAt: new Date(Date.now() + Number(refreshExpIn)),
                ip: req.ip,
                userAgent: req.headers['user-agent'] as string,
            },
        });

        createRefreshCookie(res, URT, refreshExpIn);

        Logger.info('Session created', 'refreshCreateSession');
    }
};
