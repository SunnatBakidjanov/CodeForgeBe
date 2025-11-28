import 'dotenv/config';
import cron from 'node-cron';
import { prisma } from '../../db/prisma';
import { Logger } from '../../utils/Logger';

cron.schedule('0 3 * * *', async () => {
    const cleanupTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        const deleted = await prisma.guest.deleteMany({ where: { createdAt: { lt: cleanupTime } } });

        Logger.info(`Deleted ${deleted.count} guests`, 'guestCleanup');
    } catch (error) {
        Logger.error(`Error deleting guests: ${(error as Error).message}`, 'guestCleanup');
        process.exit(1);
    }
});
