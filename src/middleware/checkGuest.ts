import { Request, Response, NextFunction } from 'express';
import { readCookie } from '../utils/readCookie';

export const checkGuest = (req: Request, res: Response, next: NextFunction) => {
    const guestCookie = readCookie(req, 'GUEST');
    const refreshCookie = readCookie(req, 'REFRESH');

    if (refreshCookie && guestCookie) {
        res.clearCookie('CFG', { path: '/' });
    }

    if (!guestCookie && !refreshCookie) {
        res.cookie('CFG', Date.now().toString(), {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
    }

    next();
};
