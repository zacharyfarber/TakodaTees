import dotenv from 'dotenv';

dotenv.config();

export const corsOrigins =
  process.env.NODE === 'production'
    ? 'https://takoda-tees-client-git-dev-zacharyfarber.vercel.app'
    : 'http://localhost:3000';
