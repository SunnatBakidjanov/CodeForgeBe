import { Router } from 'express';
import { sendMessageMail } from '../controllers/sendMessageMail';

export const sendEmailRoutes = Router();

sendEmailRoutes.post('/send-contact-mail', sendMessageMail);
