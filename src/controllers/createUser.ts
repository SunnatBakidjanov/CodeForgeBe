import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';

type RequestBody = { [key in 'name' | 'email' | 'password']: string };

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password }: RequestBody = req.body;

    if (!name || !email || !password) {
        Logger.warn('Name or email or password is missing', 'createUser');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const isUserExists = await prisma.user.findUnique({ where: { email } });

    if (isUserExists) {
        Logger.warn(`User with email ${email} already exists`, 'createUser');
        return res.status(409).json({ message: 'User already exists' });
    }

    try {
        const HASH_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        Logger.success(`User created successfully`, 'createUser');
        return res.status(201).json({ message: `User with email ${email} created successfully` });
    } catch (error) {
        Logger.error(`Server Error\n${(error as Error).message}`, 'createUser');
        return res.status(500).json({ message: 'Internal server error' });
    }
};
