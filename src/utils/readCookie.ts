import { AuthenticatedRequest } from '../types/request';
import { Logger } from './Logger';

type CookieNames = 'REFRESH' | 'ACCESS' | 'GUEST';

export const readCookie = (req: AuthenticatedRequest, cookieName: CookieNames) => {
    const cookieAbbreviation = {
        REFRESH: 'URT',
        GUEST: 'CFG',
        ACCESS: 'UAT',
    };

    const key = cookieAbbreviation[cookieName];
    const value = req.cookies[key];

    if (!value) {
        Logger.warn(`${cookieName} cookie not found`, 'readCookie');
        return undefined;
    }

    return value;
};
