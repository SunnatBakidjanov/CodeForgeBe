import { Response } from 'express';

export const createAccessCookie = (res: Response, accessToken: string) => {
    const accessExpIn = process.env.JWT_ACCESS_EXP_IN;

    if (!accessExpIn) {
        throw new Error('JWT_ACCESS_EXP_IN in env is not set');
    }

    return res.cookie('UAT', accessToken, {
        priority: 'high',
        httpOnly: true,
        secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
        sameSite: 'lax',
        maxAge: Number(accessExpIn),
    });
};

export const clearAccessCookie = (res: Response) => {
    return res.clearCookie('UAT', {
        httpOnly: true,
        secure: false, // ЗАГЛУШКА в продакшене изменить на true для HTTPS
        sameSite: 'lax',
        path: '/',
    });
};
