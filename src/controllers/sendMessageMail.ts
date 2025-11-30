import { Response } from 'express';
import 'dotenv/config';
import { Logger } from '../utils/Logger';
import { transporter } from '../service/transporter';
import { sendMessageTemplate } from '../templates/sendMessageTemplate';
import { logoIcon, messageIcon, userIcon, emailIcon } from '../utils/imgPath';
import { AuthenticatedRequest } from '../types/request';

type RequestBody = { [key in 'name' | 'email' | 'message' | 'myEmail']: string };

export const sendMessageMail = async (req: AuthenticatedRequest, res: Response) => {
    const { name, email, message }: RequestBody = req.body;

    if (!name || !email) {
        Logger.warn('Name or email is missing', 'sendMessageMail');
        return res.status(400).json({ message: 'Name or email is missing' });
    }

    try {
        await transporter.sendMail({
            from: 'CodeForge',
            to: req.myEmail,
            subject: 'New message from contact form',
            html: sendMessageTemplate({ name, email, message }),
            attachments: [
                {
                    filename: 'crossed-hammers-codeforge.png',
                    path: logoIcon,
                    cid: 'logo-codeforge',
                    contentType: 'image/png',
                },
                {
                    filename: 'message-icon-codeforge.png',
                    path: messageIcon,
                    cid: 'message-icon-codeforge',
                    contentType: 'image/png',
                },
                {
                    filename: 'user-icon-codeforge.png',
                    path: userIcon,
                    cid: 'user-icon-codeforge',
                    contentType: 'image/png',
                },
                {
                    filename: 'email-icon-codeforge.png',
                    path: emailIcon,
                    cid: 'email-icon-codeforge',
                    contentType: 'image/png',
                },
            ],
        });

        Logger.success('Message sent successfully', 'sendMessageMail');
        return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        Logger.error(`Error sending email: ${(error as Error).message}`, 'sendMessageMail');
        return res.status(500).json({ message: 'Error sending email' });
    }
};
