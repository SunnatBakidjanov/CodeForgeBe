import { Response } from 'express';
import { prisma } from '../db/prisma';
import { Logger } from '../utils/Logger';
import { createAccessToken, createRefreshToken, hashRefreshToken } from '../service/createTokens';
import type { AuthenticatedRequest } from '../types/request';
import { createRefreshCookie } from '../service/createRefreshCookie';
import { readCookie } from '../utils/readCookie';

export const refreshTokens = async (req: AuthenticatedRequest, res: Response) => {
    const refreshExpIn = req.user?.refreshExpIn as string;

    try {
        const refreshToken = readCookie(req, 'REFRESH');

        if (!refreshToken) {
            Logger.info('No refresh token', 'refreshTokens');
            return res.status(403).json({ message: 'No refresh token' });
        }

        const refreshHash = hashRefreshToken(refreshToken);

        const session = await prisma.sessions.findFirst({
            where: { refreshHash },
            include: { user: true },
        });

        if (!session) {
            Logger.info('No session found', 'refreshTokens');
            return res.status(403).json({ message: 'No session found' });
        }

        if (session.expiresAt < new Date()) {
            Logger.info('Session expired', 'refreshTokens');
            return res.status(403).json({ message: 'Session expired' });
        }

        const newAccessToken = createAccessToken({ id: session.user.id, email: session.user.email, name: session.user.name });

        const newRefreshToken = createRefreshToken();
        const newRefreshHash = hashRefreshToken(newRefreshToken);

        await prisma.sessions.update({
            where: { id: session.id },
            data: {
                refreshHash: newRefreshHash,
                expiresAt: new Date(Date.now() + Number(refreshExpIn)),
            },
        });

        createRefreshCookie(res, newRefreshToken, refreshExpIn);

        return res.json({ accessToken: newAccessToken });
    } catch (err) {
        Logger.error(`Server Error\n ${(err as Error).message}`, 'refreshTokens');
        return res.status(500).json({ message: 'Server error' });
    }
};
