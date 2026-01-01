import { Request } from 'express';

export type UserType = {
    email?: string;
    id?: string;
    createdAt?: Date;
    name?: string;
    googleId?: string | null;
    githubId?: string | null;
    password?: string | null;
    provider?: 'local' | 'google' | 'github';
    isLocalAuth?: boolean;
    updatedAt?: Date;
};

type Limit = {
    type: 'email' | 'ip' | 'user';
    count: number;
    ttl: number;
    limit: number;
};

export type AccessToken = {
    id: string;
    name: string;
    email: string;
};

export interface AuthenticatedRequest extends Request {
    user?: UserType;
    auth?: {
        accessToken?: AccessToken;
        refreshExpIn?: string;
        changePassToken?: string;
    };
    hashRounds?: number;
    myEmail?: string;
    limits?: Limit[];
}
