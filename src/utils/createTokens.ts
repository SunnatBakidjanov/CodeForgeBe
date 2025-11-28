import 'dotenv/config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { Logger } from './Logger';

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET as string;
const hashRounds = process.env.JWT_HASH_ROUND;

export const createAccessToken = (payload: object) => {
    if (!jwtAccessSecret) {
        Logger.error('JWT_ACCESS_SECRET in env is not set', 'createAccessToken');
        throw new Error('JWT_ACCESS_SECRET in env is not set');
    }

    return jwt.sign(payload, `${jwtAccessSecret}`, { expiresIn: '15m' });
};

export const createRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

export const hashToken = async (token: string) => {
    if (!hashRounds) {
        Logger.error('JWT_HASH_ROUND in env is not set', 'hashToken');
        throw new Error('JWT_HASH_ROUND in env is not set');
    }

    return bcrypt.hash(token, Number(hashRounds));
};
