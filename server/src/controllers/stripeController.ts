import { Request, Response } from 'express';

import * as stripeServices from '../services/stripeServices';

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripeServices.createPaymentIntent(amount);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
