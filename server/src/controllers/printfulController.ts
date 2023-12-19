import { Request, Response } from 'express';

import * as printfulServices from '../services/printfulServices';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await printfulServices.createProduct(req.body);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const order = await printfulServices.placeOrder(orderData);

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};
