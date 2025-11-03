import { Router } from 'express';
import { createUser } from '../controllers/createUser';
import { loginUser } from '../controllers/loginUser';

export const authRoutes = Router();

authRoutes.post('/register', createUser);
authRoutes.post('/login', loginUser);
