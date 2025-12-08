import { Response } from 'express';
import { Logger } from '../utils/Logger';
import axios from 'axios';
import { sendGithubHtml } from '../service/sendGithubHtmls';
import { prisma } from '../db/prisma';
import { createSession } from '../service/createSession';
import { AuthenticatedRequest } from '../types/request';
import { createAccessToken } from '../service/createTokens';

export const githubCallback = async (req: AuthenticatedRequest, res: Response) => {
    const code = req.query.code as string;
    const refreshExpIn = req.user?.refreshExpIn as string;

    if (!code) {
        Logger.error('No code returned from GitHub', 'githubCallback');
        return sendGithubHtml(res, 'error', 400, 'No code returned from GitHub');
    }

    try {
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_SECRET,
                code,
            },
            {
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        const access_token = tokenResponse.data.access_token;

        if (!access_token) {
            Logger.error('No access token received', 'githubCallback');
            return sendGithubHtml(res, 'error', 400, 'No access token received');
        }

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

        if (!profile || !emails) {
            Logger.error('No user data received', 'githubCallback');
            return sendGithubHtml(res, 'error', 400, 'No user data received');
        }

        let user = await prisma.user.findUnique({ where: { email: emails[0].email } });

        if (user) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    provider: 'github',
                    githubId: user.githubId || String(profile.id),
                },
            });
        } else {
            user = await prisma.user.create({
                data: {
                    name: profile.login,
                    email: emails[0].email,
                    password: null,
                    provider: 'github',
                    githubId: String(profile.id),
                },
            });
        }

        await createSession(req, res, user.id, refreshExpIn);

        Logger.success('Logged in with GitHub', 'githubCallback');

        const accessToken = createAccessToken({ id: user.id, email: user.email, name: user.name });
        return sendGithubHtml(res, 'success', 200, undefined, accessToken);
    } catch (error) {
        Logger.error(`Server error:\n ${(error as Error).message}`, 'githubCallback');
        res.status(500).json({ message: 'GitHub auth error' });
    }
};
