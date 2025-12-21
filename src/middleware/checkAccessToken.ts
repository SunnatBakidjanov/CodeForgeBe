import { Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';
import { verifyAccessToken } from '../service/createTokens';
import type { AuthenticatedRequest, AccessToken } from '../types/request';
import jwt from 'jsonwebtoken';

export const checkAccessToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        Logger.warn('Access token not found', 'checkAccessToken');
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        const decodedToken = verifyAccessToken(token);

        req.auth = {
            accessToken: decodedToken as AccessToken,
        } as AuthenticatedRequest['auth'];

        Logger.info('Access token verified', 'checkAccessToken');

        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            Logger.info('Access token expired', 'checkAccessToken');
            return res.status(401).json({ message: 'Access token expired' });
        }

        Logger.warn('Access token invalid', 'checkAccessToken');
        return res.status(403).json({ message: 'Access token invalid' });
    }
};
