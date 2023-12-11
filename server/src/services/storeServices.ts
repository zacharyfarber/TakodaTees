import DropModel from '../models/DropModel';
import ProductModel from '../models/ProductModel';

export const getRecentDrops = async () => {
  const recentDrops = await DropModel.find({ access: 'public' })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate('products');

  return recentDrops;
};

export const getProduct = async (productId: string) => {
  const product = ProductModel.findById(productId)
    .populate('drop')
    .populate('variants');

  return product;
};
