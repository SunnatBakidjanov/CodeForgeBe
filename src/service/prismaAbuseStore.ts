import { prisma } from '../db/prisma';

export const prismaAbuseStore = {
    async get(key: string) {
        return await prisma.abuseRecord.findUnique({ where: { key } });
    },

    async incr(key: string, windowSec: number) {
        const now = new Date();

        const record = await prisma.abuseRecord.findUnique({ where: { key } });

        if (!record || record.expiresAt < now) {
            const expiresAt = new Date(now.getTime() + windowSec * 1000);

            await prisma.abuseRecord.upsert({
                where: { key },
                update: { count: 1, expiresAt, blockedUntil: null },
                create: { key, count: 1, expiresAt, blockedUntil: null },
            });

            return { count: 1 };
        }

        const count = record.count + 1;
        await prisma.abuseRecord.update({ where: { key }, data: { count } });

        return { count };
    },

    async block(key: string, blockSec: number) {
        const blockedUntil = new Date(Date.now() + blockSec * 1000);

        await prisma.abuseRecord.update({ where: { key }, data: { blockedUntil, count: 1 } });

        return blockedUntil;
    },
};
