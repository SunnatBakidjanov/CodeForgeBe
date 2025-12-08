import { AuthenticatedRequest } from '../types/request';
import { Logger } from './Logger';

type CookieNames = 'REFRESH' | 'GUEST';

export const readCookie = (req: AuthenticatedRequest, cookieName: CookieNames) => {
    const cookieAbbreviation = {
        REFRESH: 'URT',
        GUEST: 'CFG',
    };

    const key = cookieAbbreviation[cookieName];
    const value = req.cookies[key];

    if (!value) {
        Logger.warn(`${cookieName} cookie not found`, 'readCookie');
        return undefined;
    }

    return value;
};
