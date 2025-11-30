import { Request } from 'express';

export type UserType = {
    id: string;
    email: string;
    password?: string;
    provider: 'local' | 'google' | 'github';
    createdAt: Date;
    updatedAt: Date;
};

export interface AuthenticatedRequest extends Request {
    user?: UserType;
    refreshExpIn?: string;
    myEmail?: string;
}

export type AccessToken = {
    id: number;
    email: string;
};
