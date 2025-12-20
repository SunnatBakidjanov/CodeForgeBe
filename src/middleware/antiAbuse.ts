import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request';
import { prismaAbuseStore } from '../service/prismaAbuseStore';
import { Logger } from '../utils/Logger';
import { readCookie } from '../utils/readCookie';

type Rules = {
    type: 'ip' | 'email' | 'user';
    windowSec: number;
    blockSec: number;
    limit: number;
};

type Arguments = {
    key: string;
    rules: Rules[];
};

export const antiAbuse = ({ key: action, rules }: Arguments) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const guest = readCookie(req, 'GUEST');
        const user = readCookie(req, 'REFRESH');
        const sessionId = user ?? guest ?? 'nonesessionid';

        for (const rule of rules) {
            const value = rule.type === 'ip' ? req.ip : rule.type === 'email' ? req.body?.email : rule.type === 'user' ? req.user?.email : null;

            if (!value) continue;

            const abuseKey = `abuse:${action}:${sessionId}:${rule.type}:${req?.ip}:${value}`;
            const record = await prismaAbuseStore.get(abuseKey);
            const now = new Date();

            if (record?.blockedUntil && record.blockedUntil > now) {
                const waitSec = Math.max(0, Math.floor((record.blockedUntil.getTime() - now.getTime()) / 1000));

                return res.status(429).json({ message: 'Too many requests', waitSec });
            }

            const { count } = await prismaAbuseStore.incr(abuseKey, rule.windowSec);

            if (count > rule.limit) {
                const blockedUntil = await prismaAbuseStore.block(abuseKey, rule.blockSec);

                const waitSec = Math.max(0, Math.floor((blockedUntil.getTime() - now.getTime()) / 1000));
                return res.status(429).json({ message: 'Too many requests', waitSec });
            }
        }

        next();
    };
};
