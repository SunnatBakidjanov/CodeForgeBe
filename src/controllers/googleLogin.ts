import 'dotenv/config';
import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import axios from 'axios';
import { prisma } from '../db/prisma';
import { createAccessToken } from '../service/createTokens';
import { refreshCreateSession } from '../service/refreshCreateSession';

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

export const googleLogin = async (req: Request, res: Response) => {
    const { googleAccessToken }: ReqBody = req.body;
    const refreshExpIn = process.env.JWT_REFRESH_EXP_IN;

    if (!refreshExpIn) {
        Logger.error('JWT_REFRESH_EXP_IN in env is not set', 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }

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

        const accessToken = createAccessToken({ id: user.id, email: user.email });

        Logger.success('Successfully logged in', 'googleLogin');
        return res.status(200).json({ message: 'Successfully logged in', accessToken });
    } catch (error) {
        Logger.error(`Error logging in: ${(error as Error).message}`, 'googleLogin');
        return res.status(500).json({ message: 'Error logging in' });
    }
};
