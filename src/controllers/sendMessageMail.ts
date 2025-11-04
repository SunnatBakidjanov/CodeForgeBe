import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { transporter } from '../utils/transporter';

type RequestBody = { [key in 'name' | 'email' | 'message']: string };

export const sendMessageMail = async (req: Request, res: Response) => {
    const { name, email, message }: RequestBody = req.body;

    if (!name || !email) {
        Logger.warn('Send message mail: Name or email is missing');
        return res.status(400).json({ message: 'Name or email is missing' });
    }

    try {
        await transporter.sendMail({
            from: 'CodeForge',
            to: email,
            subject: 'New message from contact form',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        Logger.success('Message sent successfully', 'sendMessageMail');
        return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        Logger.error(`Error sending email: ${(error as Error).message}`, 'sendMessageMail');
        return res.status(500).json({ message: 'Error sending email' });
    }
};
