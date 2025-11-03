import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';

type RequestBody = {
    name: string;
    email: string;
    password: string;
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password }: RequestBody = req.body;

    if (!name || !email || !password) {
        Logger.warn('Create user: Name or email or password is missing');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const isUserExists = await prisma.user.findUnique({ where: { email } });

    if (isUserExists) {
        Logger.warn('Create user: User already exists');
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

        Logger.success(`Create user: User created successfully`);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        Logger.error(`Create user: ${(error as Error).message}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
