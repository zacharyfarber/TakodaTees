import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';
import printfulRoutes from './routes/printfulRoutes';
import storeRoutes from './routes/storeRoutes';
import stripeRoutes from './routes/stripeRoutes';

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('Cannot connect to MongoDB: MONGO_URI is not defined');
}

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      'https://takoda-tees-client-git-dev-zacharyfarber.vercel.app',
      'https://takoda-tees-server-git-main-zacharyfarber.vercel.app'
    ]
  })
);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/printful', printfulRoutes);
app.use('/store', storeRoutes);
app.use('/stripe', stripeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
