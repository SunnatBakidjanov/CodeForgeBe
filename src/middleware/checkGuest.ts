import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';

export const checkGuest = async (req: Request, res: Response, next: NextFunction) => {
    const guest = req.cookies?.guest;
    const { user } = req.body;

    if (user) return next();

    if (!guest) {
        Logger.warn('Guest not found', 'checkGuest');
        return res.status(403).json({ message: 'Guest not found' });
    }

    try {
        const foundGuest = await prisma.guest.findUnique({ where: { id: guest } });

        if (!foundGuest) {
            Logger.warn('Guest not found in DB', 'checkGuest');
            return res.status(403).json({ message: 'Guest not found in database' });
        }

        Logger.info(`Guest found: ${guest}`, 'checkGuest');
        next();
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'checkGuest');
        return res.status(500).json({ message: 'Server error' });
    }
};
