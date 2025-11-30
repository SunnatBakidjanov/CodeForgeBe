import 'dotenv/config';
import { Response, NextFunction } from 'express';
import { Logger } from '../utils/Logger';
import { AuthenticatedRequest } from '../types/request';

export const checkRefreshExpIn = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const refreshExpIn = process.env.JWT_REFRESH_EXP_IN;

    if (!refreshExpIn) {
        Logger.error('JWT_REFRESH_EXP_IN in env is not set', 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }

    req.refreshExpIn = refreshExpIn;

    return next();
};
