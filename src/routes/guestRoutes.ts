import { Router } from 'express';
import { createGuest } from '../controllers/createGuest';

export const guestRoutes = Router();

guestRoutes.get('/create-guest', createGuest);
