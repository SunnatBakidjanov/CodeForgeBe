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
import { logout } from '../controllers/logout';
import { sendVerifyCode } from '../controllers/sendVerifyCode';
import { sendEmailRecoverPass } from '../controllers/recoverPass';
import { antiAbuse } from '../middleware/antiAbuse';

export const authRoutes = Router();

authRoutes.post('/register', checkHasRounds, antiAbuse({ key: 'register', rules: [{ type: 'ip', windowSec: 120, blockSec: 60, limit: 10 }] }), createUser);
authRoutes.get('/refresh', checkRefreshExpIn, checkAccessToken, refreshTokens);
authRoutes.post('/login', checkRefreshExpIn, loginUser);
authRoutes.post('/google-login', checkRefreshExpIn, googleLogin);
authRoutes.get('/github-login', githubLogin);
authRoutes.get('/github-callback', checkRefreshExpIn, githubCallback);
authRoutes.get('/logout', logout);
authRoutes.post(
    '/send-code',
    antiAbuse({
        key: 'send-code',
        rules: [
            { type: 'email', windowSec: 30, blockSec: 60, limit: 1 },
            { type: 'ip', windowSec: 30, blockSec: 60, limit: 1 },
        ],
    }),
    sendVerifyCode
);
authRoutes.post('/forgot-pass', sendEmailRecoverPass);
