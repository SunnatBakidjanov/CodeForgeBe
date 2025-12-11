import { Response } from 'express';
import { randomInt } from 'crypto';
import { transporter } from '../service/transporter';
import { AuthenticatedRequest } from '../types/request';
import { prisma } from '../db/prisma';
import { Logger } from '../utils/Logger';

export const sendVerifyCode = async (req: AuthenticatedRequest, res: Response) => {
    const { email }: { email: string } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const code = randomInt(0, 1_000_000).toString().padStart(6, '0');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    try {
        await prisma.verificationCode.deleteMany({ where: { email } });
        await prisma.verificationCode.create({ data: { email, code, expiresAt } });

        await transporter.sendMail({
            from: 'CodeForge',
            to: req.myEmail,
            subject: 'Verify Code',
            text: `Verify Code: ${code}`,
        });

        Logger.success('Code sent successfully', 'sendVerifyCode');
        return res.status(200).json({ message: 'Code sent successfully' });
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({ message: err.message });
    }
};
