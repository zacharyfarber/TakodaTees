import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const attemptLogin = async (username: string, password: string) => {
  const loginUser = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
  };

  if (username === loginUser.username && loginUser.password && jwtSecret) {
    const validPassword = await bcrypt.compare(password, loginUser.password);

    if (validPassword) {
      const header = {
        alg: 'HS256',
        typ: 'JWT'
      };

      const token = jwt.sign({ username }, jwtSecret, { header });

      return token;
    }
  }

  return null;
};

export const validateToken = async (token: string) => {
  if (token && jwtSecret && jwt.verify(token, jwtSecret)) {
    return true;
  }

  return false;
};
