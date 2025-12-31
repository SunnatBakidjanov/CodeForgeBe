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
import { sendEmailRecoverPass } from '../controllers/sendEmailRecoverPass';
import { antiAbuse } from '../middleware/antiAbuse';
import { changePassword } from '../controllers/changePassword';
import { checkChangePassToken } from '../middleware/checkChangePassToken';
import { checkUser } from '../middleware/checkUser';

export const authRoutes = Router();

authRoutes.post(
    '/register',
    checkHasRounds,
    antiAbuse({
        key: 'register',
        rules: [{ type: 'ip', windowSec: 900, blockSec: 300, limit: 15, res: { type: 'IP_BLOCKED' } }],
    }),
    createUser
);
authRoutes.get('/refresh', checkRefreshExpIn, checkAccessToken, refreshTokens);
authRoutes.post(
    '/login',
    checkRefreshExpIn,
    antiAbuse({
        key: 'login',
        rules: [{ type: 'ip', windowSec: 300, blockSec: 120, limit: 15, res: { type: 'IP_BLOCKED' } }],
    }),
    loginUser
);
authRoutes.post('/google-login', checkRefreshExpIn, googleLogin);
authRoutes.get('/github-login', githubLogin);
authRoutes.get('/github-callback', checkRefreshExpIn, githubCallback);
authRoutes.get('/logout', logout);
authRoutes.post(
    '/send-code',
    checkUser({ checkPlace: 'send-code', windowSec: 900, waitSec: 300, maxCount: 15, errorType: 'IP_BLOCKED' }),
    antiAbuse({
        key: 'send-code',
        rules: [
            { type: 'ip', windowSec: 900, blockSec: 300, limit: 5, res: { type: 'IP_BLOCKED' } },
            { type: 'email', windowSec: 10, blockSec: 59, limit: 0 },
        ],
    }),
    sendVerifyCode
);
authRoutes.post(
    '/forgot-pass',
    antiAbuse({
        key: 'forgot-pass',
        rules: [
            { type: 'ip', windowSec: 900, blockSec: 300, limit: 5, res: { type: 'IP_BLOCKED' } },
            { type: 'email', windowSec: 10, blockSec: 59, limit: 0 },
        ],
    }),
    sendEmailRecoverPass
);
authRoutes.post('/reset-pass', checkHasRounds, antiAbuse({ key: 'change-pass', rules: [{ type: 'ip', windowSec: 900, blockSec: 300, limit: 5 }] }), checkChangePassToken, changePassword);
authRoutes.get('/reset-pass/validate', checkChangePassToken, (req, res) => res.status(200).json({ message: 'Token is valid' }));
