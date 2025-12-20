import { Request } from 'express';

export type UserType = {
    id: string;
    email: string;
    password?: string;
    provider: 'local' | 'google' | 'github';
    createdAt: Date;
    updatedAt: Date;
};

type Limit = {
    type: 'email' | 'ip' | 'user';
    count: number;
    ttl: number;
    limit: number;
};

export type AccessToken = {
    id: number;
    email: string;
};

export interface AuthenticatedRequest extends Request {
    user?: UserType & {
        accessToken?: AccessToken;
        refreshExpIn?: string;
    };
    hashRounds?: number;
    myEmail?: string;
    limits?: Limit[];
}
