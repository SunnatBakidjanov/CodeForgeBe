import 'dotenv/config';
import { Logger } from '../utils/Logger';
import { prisma } from './prisma';

let connectionCount = 0;
let shouldConnect = true;

const connectionConfig = {
    DB_RECONNECT_INTERVAL: parseInt(process.env.DB_RECONNECT_INTERVAL || ''),
    DB_CONNECTION_LIMIT: parseInt(process.env.DB_CONNECTION_LIMIT || ''),
};

for (const [key, value] of Object.entries(connectionConfig)) {
    if (isNaN(value)) {
        Logger.error(`${key} in env is not set or invalid`);
        shouldConnect = false;
    }
}

export const dbConnect = async () => {
    if (!shouldConnect) return;

    const { DB_RECONNECT_INTERVAL, DB_CONNECTION_LIMIT } = connectionConfig;

    try {
        await prisma.$connect();
        Logger.success('Database connected');
    } catch (error) {
        Logger.error(`Database connection error: ${(error as Error).message}`);
        Logger.info(`Retrying in ${DB_RECONNECT_INTERVAL / 1000} seconds...`);

        connectionCount++;
        if (connectionCount >= DB_CONNECTION_LIMIT) {
            Logger.error('Database connection limit reached');
        } else {
            setTimeout(dbConnect, DB_RECONNECT_INTERVAL);
        }
    }
};
