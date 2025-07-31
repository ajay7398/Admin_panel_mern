import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import agentRouter from './routes/agentRoutes.js';
import cors from 'cors';
import listRouter from './routes/listRoutes.js';
dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin',router)
app.use('/api', agentRouter);
app.use('/api/lists',listRouter);
//database connection
connectDB();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});