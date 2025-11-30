import { Response } from 'express';

export const createRefreshCookie = (res: Response, refreshToken: string, refreshExpIn: string) => {
    return res.cookie('URT', refreshToken, {
        httpOnly: true,
        secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
        sameSite: 'lax',
        maxAge: Number(refreshExpIn),
    });
};
