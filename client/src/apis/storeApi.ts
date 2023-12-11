import axios from 'axios';

import { apiUrl } from '../config';

export const getRecentDrops = async () => {
  const res = await axios.get(`${apiUrl}/store/recent-drops`);

  return res.data;
};

export const getProduct = async (productId: string) => {
  const res = await axios.get(`${apiUrl}/store/product/${productId}`);

  return res.data;
};
