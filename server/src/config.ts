import dotenv from 'dotenv';

dotenv.config();

export const corsOrigins =
  process.env.NODE === 'production'
    ? [
        'https://takoda-tees-client-git-dev-zacharyfarber.vercel.app',
        'https://takoda-tees-server-git-main-zacharyfarber.vercel.app'
      ]
    : ['http://localhost:3000', 'http://localhost:5000'];
