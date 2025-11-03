import express from 'express';
import 'dotenv/config';
import { Logger } from './utils/Logger';

const app = express();
const PORT = process.env.APP_PORT;

if (!PORT) {
    Logger.error('APP_PORT in env is not set');
    process.exit(1);
}

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`);
});
