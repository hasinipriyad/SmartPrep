import express from 'express'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import interviewRouter from './routes/interview.routes.js';

const app  = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

//Use authRouter for all the paths starting with /api/auth
app.use('/api/auth',authRouter);

//Use interviewRouter for all the paths starting with /api/interview
app.use('/api/interview', interviewRouter);

export default app;