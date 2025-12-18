import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import crypto from 'crypto';
import { transporter } from '../service/transporter';

export const sendEmailRecoverPass = async (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;

    if (!email) {
        Logger.warn('Email is required', 'sendEmailRecoverPass');
        return res.status(400).json({ message: 'Email is required' });
    }

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const cooldownMs = 60 * 1000;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user?.isLocalAuth) {
            Logger.warn('User not found', 'sendEmailRecoverPass');
            return res.status(200).json({ message: 'Message has been sent' });
        }

        const token = crypto.randomUUID();
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');

        await prisma.passwordReset.create({
            data: {
                email,
                token: hashToken,
                expiresAt,
            },
        });

        await transporter.sendMail({
            from: 'CodeForge <no-reply@sunnatbackidjanov.com>',
            to: email,
            subject: 'Recover password',
            text: `http://localhost:5173/recover-password?token=${token}`,
        });

        return res.status(200).json({ message: 'Message has been sent' });
    } catch (error) {
        const err = error as Error;
        Logger.error(`Server Error\n ${err.message}`, 'sendEmailRecoverPass');
        return res.status(500).json({ message: err.message });
    }
};
