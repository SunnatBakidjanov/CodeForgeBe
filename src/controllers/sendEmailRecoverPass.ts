import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import crypto from 'crypto';
import { transporter } from '../service/transporter';
import { CLIENT_URL, CLIENT_CHANGE_PASS_URL } from '../utils/constants';
import { sendRecoverPassTemplate } from '../templates/sendRecoverPassTemplate';

export const sendEmailRecoverPass = async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;

    if (!email) {
        Logger.warn('Email is required', 'sendEmailRecoverPass');
        return res.status(400).json({ message: 'Email is required' });
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user?.isLocalAuth) {
            Logger.warn('User not found', 'sendEmailRecoverPass');
            return res.status(200).json({ message: 'Message has been sent' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');

        await prisma.passwordReset.upsert({
            where: { email },
            create: { email, token: hashToken, expiresAt },
            update: { token: hashToken, expiresAt },
        });

        try {
            await transporter.sendMail({
                from: 'CodeForge <no-reply@sunnatbackidjanov.com>',
                to: email,
                subject: 'Recover password',
                html: sendRecoverPassTemplate({ passwordResetLink: `${CLIENT_URL}${CLIENT_CHANGE_PASS_URL}?token=${token}&email=${email}` }),
            });
        } catch (error) {
            const err = error as Error;
            Logger.error(`Server Error\n ${err.message}`, 'sendEmailRecoverPass');
        }

        return res.status(200).json({ message: 'Message has been sent' });
    } catch (error) {
        const err = error as Error;
        Logger.error(`Server Error\n ${err.message}`, 'sendEmailRecoverPass');
        return res.status(500).json({ message: err.message });
    }
};
