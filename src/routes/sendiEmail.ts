import { Router } from 'express';
import { sendMessageMail } from '../controllers/sendMessageMail';
import { antiAbuse } from '../middleware/antiAbuse';
import { checkMyEmail } from '../middleware/checkMyEmail';

export const sendEmailRoutes = Router();

sendEmailRoutes.post(
    '/send-contact-mail',
    checkMyEmail,
    antiAbuse({
        key: 'send-contact-mail',
        rules: [
            { type: 'ip', windowSec: 900, blockSec: 300, limit: 5, res: { type: 'IP_BLOCKED' } },
            { type: 'email', windowSec: 10, blockSec: 59, limit: 0 },
        ],
    }),
    sendMessageMail
);
