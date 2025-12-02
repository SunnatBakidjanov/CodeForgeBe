import 'dotenv/config';
import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import axios from 'axios';

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

export const githubCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;

    if (!code) {
        Logger.error('No code returned from GitHub', 'githubCallback');
        return res.status(400).json({ message: 'Invalid request' });
    }

    try {
        // 1. Получаем access_token
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_SECRET,
                code,
            },
            {
                headers: { Accept: 'application/json' },
            }
        );

        const access_token = tokenResponse.data.access_token;

        if (!access_token) {
            Logger.error('No access token received', 'githubCallback');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        Logger.info(`Github access token: ${access_token}`, 'githubCallback');

        // 2. Получаем данные профиля
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const emailResponse = await axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const profile = userResponse.data;
        const emails = emailResponse.data;

        // Тут создаёшь пользователя/сессию — как в Google Login
        // ...

        // 3. Редиректим обратно на фронт
        res.redirect(`http://localhost:3000/login-success?token=${access_token}`);
    } catch (error) {
        Logger.error(`Server error:\n ${(error as Error).message}`, 'githubCallback');
        res.status(500).json({ message: 'GitHub auth error' });
    }
};
