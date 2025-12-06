import { Router } from 'express';
import { createUser } from '../controllers/createUser';
import { loginUser } from '../controllers/loginUser';
import { refreshTokens } from '../controllers/refreshTokens';
import { checkAccessToken } from '../middleware/checkAccessToken';
import { googleLogin } from '../controllers/googleLogin';
import { checkRefreshExpIn } from '../middleware/checkRefreshExpIn';
import { checkHasRounds } from '../middleware/checkHashRounds';
import { githubLogin } from '../controllers/githubLogin';
import { githubCallback } from '../controllers/githubCallback';

export const authRoutes = Router();

authRoutes.post('/register', checkHasRounds, createUser);
authRoutes.get('/refresh', checkRefreshExpIn, checkAccessToken, refreshTokens);
authRoutes.post('/login', checkRefreshExpIn, loginUser);
authRoutes.post('/google-login', checkRefreshExpIn, googleLogin);
authRoutes.get('/github-login', githubLogin);
authRoutes.get('/github-callback', checkRefreshExpIn, githubCallback);
