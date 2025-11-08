import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';

export const createGuest = async (req: Request, res: Response) => {
    const guest = req.cookies?.guest;

    if (!guest) {
        const guestId = Date.now().toString();
        const cookieMaxAge = 1000 * 60 * 60 * 24 * 7; // 7 days

        res.cookie('guest', guestId, {
            httpOnly: false,
            secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
            sameSite: 'lax',
            maxAge: cookieMaxAge,
            priority: 'low',
        });

        Logger.success(`Guest ${guestId} created`, 'createGuest');
        return res.status(201).json({ message: 'Guest created successfully', guestId: guestId });
    }

    Logger.info('Guest already exists', 'createGuest');
    return res.status(200).json({ message: 'Guest already exists' });
};
