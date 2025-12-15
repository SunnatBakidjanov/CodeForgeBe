import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import crypto from 'crypto';

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

        if (!user?.isLocalAuth) {
            Logger.warn('User not found', 'sendEmailRecoverPass');
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordReset = await prisma.passwordReset.findFirst({ where: { email } });

        if (passwordReset) {
            const now = Date.now();
            const lastSent = passwordReset.lastSentAt.getTime();

            if (now - lastSent < cooldownMs) {
                const waitSec = Math.ceil((cooldownMs - (now - lastSent)) / 1000);
                return res.status(429).json({ message: `Please wait ${waitSec} seconds before requesting a new code.`, waitSec });
            }

            await prisma.passwordReset.deleteMany({ where: { email } });
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

        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        const err = error as Error;
        Logger.error(`Server Error\n ${err.message}`, 'sendEmailRecoverPass');
        return res.status(500).json({ message: err.message });
    }
};
