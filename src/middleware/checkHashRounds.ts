import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request';
import { Logger } from '../utils/Logger';

export const checkHasRounds = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const hashRounds = process.env.USER_HASH_ROUNDS;

    if (!hashRounds) {
        Logger.error('USER_HASH_ROUNDS in env is not set', 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }

    req.user = {
        userHashRounds: Number(hashRounds),
    } as AuthenticatedRequest['user'];

    return next();
};
