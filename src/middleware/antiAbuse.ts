import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request';
import { prisma } from '../db/prisma';
import { prismaAbuseStore } from '../service/prismaAbuseStore';

type Rules = {
    type: 'ip' | 'email' | 'user';
    windowSec: number;
    limit: number;
};

type Arguments = {
    key: string;
    rules: Rules[];
};

export const antiAbuse = ({ key: action, rules }: Arguments) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        for (const rule of rules) {
            const value = rule.type === 'ip' ? req.ip : rule.type === 'email' ? req.body?.email : rule.type === 'user' ? req.user?.email : null;

            if (!value) continue;

            const abuseKey = `abuse:${action}:${rule.type}:${value}`;
            const { count, ttl } = await prismaAbuseStore.incr(abuseKey, rule.windowSec);

            if (count > rule.limit) {
                return res.status(429).json({ message: 'Too many requests', waitSec: ttl });
            }
        }

        next();
    };
};
