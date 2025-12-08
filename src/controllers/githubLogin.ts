import 'dotenv/config';
import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';

export const githubLogin = async (req: Request, res: Response) => {
    const clientID = process.env.GITHUB_CLIENT_ID;

    if (!clientID) {
        Logger.error('GITHUB_CLIENT_ID in env is not set', 'githubLogin');
        return res.status(500).json({ message: 'Server error' });
    }

    const params = new URLSearchParams({
        client_id: clientID,
        scope: 'read:user user:email',
    });

    Logger.info('Redirecting to GitHub', 'githubLogin');

    res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
};
