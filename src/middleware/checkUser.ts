import { Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import { AuthenticatedRequest } from '../types/request';
import { prismaAbuseStore } from '../service/prismaAbuseStore';
import { readCookie } from '../utils/readCookie';

type Arguments = {
    windowSec: number;
    checkPlace: string;
    waitSec: number;
    maxCount: number;
};

export const checkUser = ({ checkPlace, windowSec, waitSec, maxCount }: Arguments) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const { email }: { email: string } = req.body;
        const guest = readCookie(req, 'GUEST');
        const user = readCookie(req, 'REFRESH');
        const sessionId = user ?? guest ?? 'nonesessionid';

        if (!email) {
            Logger.warn('Missing required fields', 'checkUser');
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const abuseKey = `abuse:${checkPlace}:${sessionId}:email:${req?.ip}:ip`;
            const record = await prismaAbuseStore.get(abuseKey);
            const now = new Date();

            if (record?.blockedUntil && record.blockedUntil > new Date()) {
                const waitSec = Math.max(0, Math.floor((record.blockedUntil.getTime() - now.getTime()) / 1000));

                return res.status(429).json({ message: 'Too many requests', waitSec });
            }

            const { count } = await prismaAbuseStore.incr(abuseKey, windowSec);

            if (count > maxCount) {
                await prismaAbuseStore.block(abuseKey, waitSec);
            }

            const user = await prisma.user.findUnique({ where: { email } });

            if (user && user?.isLocalAuth) {
                Logger.info(`User with email ${email} already exists`, 'sendVerifyCode');
                return res.status(409).json({ message: 'If email is valid, code has been sent' });
            }

            req.user = {
                email,
            };

            next();
        } catch (error) {
            Logger.error(`Server Error\n ${(error as Error).message}`, 'checkUser');
            return res.status(500).json({ message: 'Server error' });
        }
    };
};
