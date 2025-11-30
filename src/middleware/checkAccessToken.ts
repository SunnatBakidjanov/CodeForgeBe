import { Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';
import { verifyAccessToken } from '../service/createTokens';
import type { AuthenticatedRequest, AccessToken } from '../types/request';

export const checkAccessToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        Logger.warn('Access token not found', 'checkAccessToken');
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        const decodedToken = verifyAccessToken(token);

        Logger.info('Access token verified', 'checkAccessToken');

        if (req.user) {
            req.user.accessToken = decodedToken as AccessToken;
        }

        next();
    } catch (err) {}
};
