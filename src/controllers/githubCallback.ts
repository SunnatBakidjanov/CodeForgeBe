import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import axios from 'axios';
import { sendGithubHtml } from '../service/sendGithubHtmls';

export const githubCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;

    if (!code) {
        Logger.error('No code returned from GitHub', 'githubCallback');
        return sendGithubHtml(res, 'error', 400, 'No code returned from GitHub');
    }

    try {
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_SECRET,
            code,
        });

        const access_token = tokenResponse.data.access_token;

        if (!access_token) {
            Logger.error('No access token received', 'githubCallback');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        Logger.info(`Github access token: ${access_token}`, 'githubCallback');

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

        return res.send(`
            <html>
            <body>
            <script>
                window.opener.postMessage(
                    {
                        type: "github_auth",
                        status: "error",
                        message: ""
                    },
                    "*"
                );
                window.close();
            </script>
            </body>
            </html>
        `);
    } catch (error) {
        Logger.error(`Server error:\n ${(error as Error).message}`, 'githubCallback');
        res.status(500).json({ message: 'GitHub auth error' });
    }
};
