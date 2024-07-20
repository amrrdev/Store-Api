import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config({ path: './.env' });

import app from './app.js';

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
    .connect(DB)
    .then(() => console.log('DB Connected Successfully'))
    .catch((err) => console.log(`DB Connection Error -> ${err.message}`));

const PORT = process.env.PORT || 9000;
const localHost = '127.0.0.1';

app.listen(PORT, localHost, () => console.log(`Server is running on port ${PORT} ...`));
