import { Logger } from '../utils/Logger';
import { prisma } from './prisma';

export const dbConnect = async () => {
    try {
        await prisma.$connect();
        Logger.success('Database connected');
    } catch (error) {
        Logger.error(`Database connection error: ${error}`);
    }
};
