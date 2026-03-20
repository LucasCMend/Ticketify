import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.use(errorHandler)


export default app;