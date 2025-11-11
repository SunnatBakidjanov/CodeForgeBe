import { Router } from 'express';
import { sendMessageMail } from '../controllers/sendMessageMail';
import { checkMyEmail } from '../middleware/checkMyEmail';
import { checkGuest } from '../middleware/checkGuest';

export const sendEmailRoutes = Router();

sendEmailRoutes.post('/send-contact-mail', checkMyEmail, checkGuest, sendMessageMail);
