import 'dotenv/config';
import nodemailer, { Transporter } from 'nodemailer';
import { Logger } from '../utils/Logger';

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    Logger.error('EMAIL_USER or EMAIL_PASS in env is not set', 'transporter');
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

Logger.info('Transporter initialized', 'transporter');
