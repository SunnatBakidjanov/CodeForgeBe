import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Logger } from './utils/Logger';
import { dbConnect } from './db/dbConnect';
import { authRoutes } from './routes/authRoutes';
import { sendEmailRoutes } from './routes/sendiEmail';
import { guestRoutes } from './routes/guestRoutes';

const app = express();
const PORT = process.env.APP_PORT;

if (!PORT) {
    Logger.error('APP_PORT in env is not set', 'app');
    process.exit(1);
}

app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:4173'],
        credentials: true,
    })
);

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', sendEmailRoutes);
app.use('/api', guestRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`, 'app');
});
