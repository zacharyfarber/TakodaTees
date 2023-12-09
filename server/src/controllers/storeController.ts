import { Request, Response } from 'express';

import * as storeServices from '../services/storeServices';

export const getRecentDrops = async (_req: Request, res: Response) => {
  try {
    const recentDrops = await storeServices.getRecentDrops();

    return res.status(200).json(recentDrops);
  } catch (err) {
    return res.status(500).json(err);
  }
};
