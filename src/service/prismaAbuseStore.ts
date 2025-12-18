import { prisma } from '../db/prisma';

export const prismaAbuseStore = {
    async incr(key: string, windowSec: number) {
        const now = new Date();

        const record = await prisma.abuseRecord.findUnique({ where: { key } });

        if (!record || record.expiresAt < now) {
            const expiresAt = new Date(now.getTime() + windowSec * 1000);

            await prisma.abuseRecord.upsert({
                where: { key },
                update: { count: 1, expiresAt },
                create: { key, count: 1, expiresAt },
            });

            return { count: 1, ttl: windowSec };
        }

        const count = record.count + 1;
        await prisma.abuseRecord.update({ where: { key }, data: { count } });

        const ttl = Math.ceil((record.expiresAt.getTime() - now.getTime()) / 1000);

        return { count, ttl };
    },
};
