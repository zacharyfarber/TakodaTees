import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('Cannot connect to MongoDB: MONGO_URI is not defined');
}

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5000'] }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
