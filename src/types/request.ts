import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export type AccessToken = {
    id: number;
    email: string;
};
