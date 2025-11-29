import { Router } from 'express';
import { createUser } from '../controllers/createUser';
import { loginUser } from '../controllers/loginUser';
import { refreshTokens } from '../controllers/refreshTokens';
import { checkAccessToken } from '../middleware/checkAccessToken';

export const authRoutes = Router();

authRoutes.post('/register', createUser);
authRoutes.get('/refresh', checkAccessToken, refreshTokens);
authRoutes.post('/login', loginUser);
