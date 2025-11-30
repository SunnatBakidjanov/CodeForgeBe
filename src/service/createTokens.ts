import 'dotenv/config';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Logger } from '../utils/Logger';

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const accessExpIn = process.env.JWT_ACCESS_EXP_IN;

if (!jwtAccessSecret) {
    Logger.error('JWT_ACCESS_SECRET in env is not set', 'createAccessToken');
    throw new Error('JWT_ACCESS_SECRET in env is not set');
}

if (!accessExpIn) {
    Logger.error('JWT_ACCESS_EXP_IN in env is not set', 'createAccessToken');
    throw new Error('JWT_ACCESS_EXP_IN in env is not set');
}

export const createAccessToken = (payload: object) => {
    return jwt.sign(payload, `${jwtAccessSecret}`, { expiresIn: Number(accessExpIn) });
};

export const createRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

export const hashRefreshToken = (token: string) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, jwtAccessSecret);
};
