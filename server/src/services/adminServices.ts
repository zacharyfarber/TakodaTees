import DropModel from '../models/DropModel';
import ProductModel from '../models/ProductModel';
import { Product } from '../types';

export const createDrop = async (dropName: string) => {
  const drop = new DropModel({ name: dropName });

  await drop.save();

  return drop;
};

export const getDrop = async (dropId: string) => {
  const drop = await DropModel.findById(dropId).populate('products');

  return drop;
};

export const getDrops = async () => {
  const drops = await DropModel.find()
    .populate('products')
    .sort({ createdAt: -1 });

  return drops;
};

export const updateDrop = async (
  dropId: string,
  dropName: string,
  dropAccess: string,
  productsToRemove: Product[]
) => {
  if (productsToRemove.length > 0) {
    const productIdsToRemove = productsToRemove.map((product) => product._id);

    await ProductModel.updateMany(
      { _id: { $in: productIdsToRemove } },
      { $pull: { drop: dropId } }
    );

    await DropModel.findByIdAndUpdate(dropId, {
      $pull: { products: { $in: productIdsToRemove } }
    });
  }

  const drop = await DropModel.findByIdAndUpdate(
    dropId,
    { name: dropName, access: dropAccess },
    { new: true }
  );

  return drop;
};

export const deleteDrop = async (dropId: string) => {
  await DropModel.findByIdAndDelete(dropId);

  await ProductModel.updateMany({ drop: dropId }, { $set: { drop: null } });
};
