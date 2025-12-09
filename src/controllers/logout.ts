import { Response, Request } from 'express';
import { readCookie } from '../utils/readCookie';
import { clearRefreshCookie } from '../service/createRefreshCookie';
import { prisma } from '../db/prisma';
import { hashRefreshToken } from '../service/createTokens';
import { Logger } from '../utils/Logger';

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshCookie = readCookie(req, 'REFRESH');

        if (!refreshCookie) {
            Logger.warn('No refresh cookie', 'logout');
            return res.status(200).json({ message: 'No refresh cookie' });
        }

        const refreshHash = hashRefreshToken(refreshCookie);
        await prisma.sessions.delete({ where: { refreshHash: refreshHash } });

        clearRefreshCookie(res);

        Logger.success('User logged out successfully', 'logout');
        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        const err = error as Error;
        Logger.error(`Server Error\n ${err.message}`, 'logout');
        return res.status(500).json({ message: 'Server error' });
    }
};

export const silentLogout = async (req: Request, res: Response) => {
    const refreshCookie = readCookie(req, 'REFRESH');

    if (!refreshCookie) return;

    const refreshHash = hashRefreshToken(refreshCookie);
    await prisma.sessions.deleteMany({ where: { refreshHash } });

    clearRefreshCookie(res);
};
