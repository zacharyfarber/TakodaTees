import { Request, Response } from 'express';

import * as storeServices from '../services/storeServices';

export const getDrop = async (req: Request, res: Response) => {
  try {
    const { dropId } = req.params;

    const drop = await storeServices.getDrop(dropId);

    return res.status(200).json(drop);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getRecentDrops = async (_req: Request, res: Response) => {
  try {
    const recentDrops = await storeServices.getRecentDrops();

    return res.status(200).json(recentDrops);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await storeServices.getProduct(productId);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};
