import { Request } from 'express';

export type UserType = {
    id: string;
    email: string;
    password?: string;
    provider: 'local' | 'google' | 'github';
    createdAt: Date;
    updatedAt: Date;
};

export type AccessToken = {
    id: number;
    email: string;
};

export interface AuthenticatedRequest extends Request {
    user?: UserType & {
        accessToken?: AccessToken;
        refreshExpIn?: string;
        userHashRounds?: number;
    };
    myEmail?: string;
}
