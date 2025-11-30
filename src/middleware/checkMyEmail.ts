import 'dotenv/config';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request';
import { Logger } from '../utils/Logger';

export const checkMyEmail = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const myEmail = process.env.EMAIL_USER;

    if (!myEmail) {
        Logger.error('EMAIL_USER in env is not set', 'sendMessageMail');
        return res.status(500).json({ message: 'Error sending email' });
    }

    req.myEmail = myEmail;

    next();
};
