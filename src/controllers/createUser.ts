import { Response } from 'express';
import { Logger } from '../utils/Logger';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';
import { AuthenticatedRequest } from '../types/request';

type RequestBody = { [key in 'name' | 'email' | 'password']: string };

export const createUser = async (req: AuthenticatedRequest, res: Response) => {
    const { name, email, password }: RequestBody = req.body;

    if (!name || !email || !password) {
        Logger.warn('Name or email or password is missing', 'createUser');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user?.isLocalAuth) {
        Logger.warn(`User with email ${email} already exists`, 'createUser');
        return res.status(409).json({ message: 'User already exists' });
    }

    try {
        const HASH_ROUNDS = req.user?.userHashRounds as number;
        const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

        if (!user) {
            await prisma.user.create({
                data: {
                    isLocalAuth: true,
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            Logger.success(`User created successfully`, 'createUser');
            return res.status(201).json({ message: `User with email ${email} created successfully` });
        }

        await prisma.user.update({
            where: { email },
            data: {
                isLocalAuth: true,
                password: hashedPassword,
                name: name,
            },
        });

        Logger.success('User updated successfully', 'createUser');
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        Logger.error(`Server Error\n${(error as Error).message}`, 'createUser');
        return res.status(500).json({ message: 'Internal server error' });
    }
};
