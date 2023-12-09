import { Request, Response } from 'express';

import * as adminServices from '../services/adminServices';

export const createDrop = async (req: Request, res: Response) => {
  try {
    const drop = await adminServices.createDrop(req.body.dropName);

    return res.status(200).json(drop);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getDrop = async (req: Request, res: Response) => {
  try {
    const drop = await adminServices.getDrop(req.params.dropId);

    return res.status(200).json(drop);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getDrops = async (_req: Request, res: Response) => {
  try {
    const drops = await adminServices.getDrops();

    return res.status(200).json(drops);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateDrop = async (req: Request, res: Response) => {
  try {
    const drop = await adminServices.updateDrop(
      req.params.dropId,
      req.body.dropName,
      req.body.dropAccess,
      req.body.productsToRemove
    );

    return res.status(200).json(drop);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteDrop = async (req: Request, res: Response) => {
  try {
    await adminServices.deleteDrop(req.params.dropId);

    return res.status(200).json({ message: 'OK' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await adminServices.getProduct(req.params.productId);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await adminServices.getProducts();

    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateProductData = async (req: Request, res: Response) => {
  try {
    const product = await adminServices.updateProductData(
      req.params.productId,
      req.body.productData
    );

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updateProductDrop = async (req: Request, res: Response) => {
  try {
    const product = await adminServices.updateProductDrop(
      req.params.productId,
      req.body.dropName
    );

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await adminServices.deleteProduct(req.params.productId);

    return res.status(200).json({ message: 'OK' });
  } catch (err) {
    return res.status(500).json(err);
  }
};
