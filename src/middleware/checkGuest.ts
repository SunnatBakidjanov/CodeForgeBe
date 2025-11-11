import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';

export const checkGuest = (req: Request, res: Response, next: NextFunction) => {
    const guest = req.cookies?.guest;

    if (!guest) {
        Logger.warn('Guest not found', 'checkGuest');
        return res.status(401).json({ message: 'Guest not found' });
    } else {
        try {
            prisma.guest.findUnique({ where: { id: guest } });
            Logger.info('Guest found', 'checkGuest');
        } catch (error) {
            Logger.error(`Server Error\n ${(error as Error).message}`, 'checkGuest');
            return res.status(500).json({ message: 'Error sending email' });
        }
    }

    next();
};
