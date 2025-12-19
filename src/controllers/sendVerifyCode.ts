import { Response } from 'express';
import { transporter } from '../service/transporter';
import { AuthenticatedRequest } from '../types/request';
import { prisma } from '../db/prisma';
import { Logger } from '../utils/Logger';
import { sendVerifyCodeTemplate } from '../templates/sendVerifyCodeTemplate';
import { generateVerifyCode } from '../service/generateVerifyCode';

export const sendVerifyCode = async (req: AuthenticatedRequest, res: Response) => {
    const { email }: { email: string } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const code = generateVerifyCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user?.isLocalAuth) {
            Logger.info(`User with email ${email} already exists`, 'sendVerifyCode');
            return res.status(200).json({ message: 'If email is valid, code has been sent' });
        }

        await prisma.verificationCode.upsert({
            where: { email },
            update: { code, expiresAt },
            create: { email, code, expiresAt },
        });

        await transporter.sendMail({
            from: 'CodeForge <no-reply@sunnatbackidjanov.com>',
            to: email,
            subject: 'Your confirmation code',
            html: sendVerifyCodeTemplate({ verifyCode: code }),
        });

        Logger.success('Code sent successfully', 'sendVerifyCode');
        return res.status(200).json({ message: 'Code sent successfully' });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};
