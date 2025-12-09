import { Response } from 'express';

export const createRefreshCookie = (res: Response, refreshToken: string, refreshExpIn: string) => {
    return res.cookie('URT', refreshToken, {
        priority: 'high',
        httpOnly: true,
        secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
        sameSite: 'lax',
        maxAge: Number(refreshExpIn),
    });
};

export const clearRefreshCookie = (res: Response) => {
    return res.clearCookie('URT', {
        httpOnly: true,
        secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
        sameSite: 'lax',
        path: '/',
    });
};
