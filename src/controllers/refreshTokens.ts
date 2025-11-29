import { Request, Response } from 'express';
import { prisma } from '../db/prisma';
import { Logger } from '../utils/Logger';
import { createAccessToken, createRefreshToken, hashRefreshToken } from '../utils/createTokens';
import type { AuthenticatedRequest } from '../types/request';

export const refreshTokens = async (req: AuthenticatedRequest, res: Response) => {
    const refreshExpIn = process.env.JWT_REFRESH_EXP_IN;

    if (!refreshExpIn) {
        Logger.error('JWT_REFRESH_EXP_IN in env is not set', 'refreshTokens');
        return res.status(500).json({ message: 'Error refreshing tokens' });
    }

    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            Logger.info('No refresh token', 'refreshTokens');
            return res.status(401).json({ message: 'No refresh token' });
        }

        const refreshHash = hashRefreshToken(refreshToken);

        const session = await prisma.sessions.findFirst({
            where: { refreshHash },
            include: { user: true },
        });

        if (!session) {
            Logger.info('No session found', 'refreshTokens');
            return res.status(401).json({ message: 'No session found' });
        }

        if (session.expiresAt < new Date()) {
            Logger.info('Session expired', 'refreshTokens');
            return res.status(401).json({ message: 'Session expired' });
        }

        const newAccessToken = createAccessToken({ id: session.user.id, email: session.user.email });

        const newRefreshToken = createRefreshToken();
        const newRefreshHash = hashRefreshToken(newRefreshToken);

        await prisma.sessions.update({
            where: { id: session.id },
            data: {
                refreshHash: newRefreshHash,
                expiresAt: new Date(Date.now() + Number(refreshExpIn)),
            },
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
            sameSite: 'lax',
            maxAge: Number(refreshExpIn),
        });

        return res.json({ accessToken: newAccessToken });
    } catch (err) {
        Logger.error(`Server Error\n ${(err as Error).message}`, 'refreshTokens');
        return res.status(500).json({ message: 'Server error' });
    }
};
