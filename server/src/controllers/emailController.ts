import { Request, Response } from 'express';

import * as emailService from '../services/emailServices';

export const sendConfirmationEmail = async (req: Request, res: Response) => {
  try {
    const { email, items, subtotal, shipping } = req.body;

    await emailService.sendEmail(email, items, subtotal, shipping);

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
};
