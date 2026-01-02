import { Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';
import { verifyAccessToken } from '../service/createTokens';
import type { AuthenticatedRequest, AccessToken } from '../types/request';
import jwt from 'jsonwebtoken';
import { readCookie } from '../utils/readCookie';

export const checkAccessToken = (req: AuthenticatedRequest, res: Response, next?: NextFunction) => {
    const accessToken = readCookie(req, 'ACCESS');

    if (!accessToken) {
        Logger.warn('Access token not found', 'checkAccessToken');
        return res.status(401).json({ message: 'INVALID_ACCESS_TOKEN' });
    }

    try {
        const decodedToken = verifyAccessToken(accessToken);

        req.auth = {
            accessToken: decodedToken as AccessToken,
        } as AuthenticatedRequest['auth'];

        Logger.info('Access token verified', 'checkAccessToken');

        if (next) next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            Logger.info('Access token expired', 'checkAccessToken');
            return res.status(401).json({ message: 'INVALID_ACCESS_TOKEN' });
        }

        Logger.warn('Access token invalid', 'checkAccessToken');
        return res.status(403).json({ message: 'Access token invalid' });
    }
};
