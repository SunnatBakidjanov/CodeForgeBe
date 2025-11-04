import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';

type RequestBody = { [key in 'email' | 'password']: string };

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: RequestBody = req?.body;

    if (!email || !password) {
        Logger.warn('Email or password is missing', 'loginUser');
        return res.status(400).json({ message: 'Email or password is missing' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            Logger.warn(`${email} not found`, 'loginUser');
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            Logger.warn(`${email} incorrect password`, 'loginUser');
            return res.status(401).json({ message: 'Email or password is missing' });
        }

        Logger.success(`${email} logged in successfully`, 'loginUser');
        return res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        Logger.error(`Server Error\n ${(error as Error).message}`, 'loginUser');
        return res.status(500).json({ message: 'Error logging in' });
    }
};
