import { Request, Response } from 'express';

import * as authServices from '../services/authServices';

export const attemptLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const token = await authServices.attemptLogin(username, password);

    if (token) {
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid username or password.' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const validateToken = async (req: Request, res: Response) => {
  try {
    const isValidated = await authServices.validateToken(req.body.token);

    if (isValidated) {
      return res.status(200).json({ isValidated: true });
    }

    return res.status(401).json({ message: 'Invalid token' });
  } catch (err) {
    return res.status(500).json(err);
  }
};
