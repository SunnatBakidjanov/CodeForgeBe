import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';

type RequestBody = {
    email: string;
    password: string;
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: RequestBody = req?.body;

    if (!email || !password) {
        Logger.warn('Login: Email or password is missing');
        return res.status(400).json({ message: 'Email or password is missing' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            Logger.warn(`Login: User with email ${email} not found`);
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            Logger.warn(`Login: User with email ${email} incorrect password`);
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        Logger.success(`Login: ${email} logged in successfully`);
        return res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        Logger.error(`Login: Server Error\n ${(error as Error).message}`);
        return res.status(500).json({ message: 'Error logging in' });
    }
};
