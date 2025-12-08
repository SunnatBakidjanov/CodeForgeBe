import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import { readCookie } from '../utils/readCookie';

export const createGuest = async (req: Request, res: Response) => {
    const guest = readCookie(req, 'GUEST');
    const user = readCookie(req, 'REFRESH');

    if (user) {
        Logger.warn('User already logged in', 'createGuest');

        res.clearCookie('CFG', {
            httpOnly: false,
            secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
            sameSite: 'lax',
            path: '/',
        });

        return res.status(403).json({ message: 'User already logged in' });
    }

    if (!guest) {
        const guestId = Date.now().toString();
        const cookieMaxAge = 1000 * 60 * 60 * 24 * 7; // 7 days

        res.cookie('CFG', guestId, {
            httpOnly: false,
            secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
            sameSite: 'lax',
            maxAge: cookieMaxAge,
        });

        try {
            await prisma.guest.create({ data: { id: guestId } });
        } catch (error) {
            Logger.error(`Error creating guest: ${(error as Error).message}`, 'createGuest');
            return res.status(500).json({ message: 'Error creating guest' });
        }

        Logger.success(`Guest ${guestId} created`, 'createGuest');
        return res.status(201).json({ message: 'Guest created successfully', guestId: guestId });
    }

    Logger.info('Guest already exists', 'createGuest');
    return res.status(200).json({ message: 'Guest already exists' });
};
