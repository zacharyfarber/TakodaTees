import DropModel from '../models/DropModel';
import ProductModel from '../models/ProductModel';
import { ProductData } from '../types';

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
  productsToRemove: string[]
) => {
  if (productsToRemove.length > 0) {
    await ProductModel.updateMany(
      { _id: { $in: productsToRemove } },
      { $set: { drop: null } }
    );

    await DropModel.findByIdAndUpdate(dropId, {
      $pull: { products: { $in: productsToRemove } }
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

export const getProduct = async (productId: string) => {
  const product = await ProductModel.findById(productId)
    .populate('variants')
    .populate('drop');

  return product;
};

export const getProducts = async () => {
  const products = await ProductModel.find().sort({ createdAt: -1 });

  return products;
};

export const updateProductData = async (
  productId: string,
  productData: ProductData
) => {
  const {
    name,
    price,
    colors,
    sizes,
    description,
    details,
    category,
    keywords
  } = productData;

  for (const key in colors) {
    if (colors[key] && colors[key].length) colors[key] = '#' + colors[key];
  }

  const keywordsArray = keywords.split(',');

  const update = {
    name,
    price,
    colors,
    sizes,
    description,
    details,
    category,
    keywords: keywordsArray
  };

  const product = await ProductModel.findByIdAndUpdate(
    productId,
    { $set: update },
    {
      new: true
    }
  );

  return product;
};

export const updateProductDrop = async (
  productId: string,
  dropName: string
) => {
  await DropModel.updateMany(
    { products: { $in: [productId] } },
    { $pull: { products: productId } }
  );

  const drop = await DropModel.findOneAndUpdate(
    { name: dropName },
    { $push: { products: productId } },
    { new: true }
  );

  const product = await ProductModel.findByIdAndUpdate(
    productId,
    { drop: drop?._id },
    { new: true }
  );

  return product;
};

export const deleteProduct = async (productId: string) => {
  await DropModel.updateMany(
    { products: { $in: [productId] } },
    { $pull: { products: productId } }
  );

  await ProductModel.findByIdAndDelete(productId);
};
