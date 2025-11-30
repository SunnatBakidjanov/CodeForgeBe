import 'dotenv/config';
import { Response } from 'express';
import { Logger } from '../utils/Logger';
import axios from 'axios';
import { prisma } from '../db/prisma';
import { createAccessToken } from '../service/createTokens';
import { refreshCreateSession } from '../service/refreshCreateSession';
import { AuthenticatedRequest } from '../types/request';

type ReqBody = {
    googleAccessToken: string;
};
type GoogleUser = {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
};

export const googleLogin = async (req: AuthenticatedRequest, res: Response) => {
    const { googleAccessToken }: ReqBody = req.body;
    const refreshExpIn = req.user?.refreshExpIn as string;

    if (!googleAccessToken) {
        Logger.warn('Google access token is missing', 'googleLogin');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const resGoogle = await axios.get<GoogleUser>('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${googleAccessToken}` } });
        const googleData = resGoogle.data;

        if (!googleData || !googleData.name || !googleData.email) {
            Logger.warn('Google user data is missing', 'googleLogin');
            return res.status(400).json({ message: 'Missing required fields' });
        }

        let user = await prisma.user.findUnique({ where: { googleId: googleData.sub } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: googleData.name,
                    email: googleData.email,
                    password: null,
                    provider: 'google',
                    googleId: googleData.sub,
                },
            });
        }

        refreshCreateSession(req, res, user.id, refreshExpIn);

        Logger.success('Successfully logged in', 'googleLogin');

        const accessToken = createAccessToken({ id: user.id, email: user.email });
        return res.status(200).json({ message: 'Successfully logged in', accessToken });
    } catch (error) {
        Logger.error(`Error logging in: ${(error as Error).message}`, 'googleLogin');
        return res.status(500).json({ message: 'Error logging in' });
    }
};
