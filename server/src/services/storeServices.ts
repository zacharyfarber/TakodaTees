import DropModel from '../models/DropModel';

export const getRecentDrops = async () => {
  const recentDrops = await DropModel.find({ access: 'public' })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate('products');

  return recentDrops;
};
