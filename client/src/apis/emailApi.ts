import axios from 'axios';

import { apiUrl } from '../config';
import { CartItemType } from '../types';

export const sendEmail = async (
  email: string,
  items: CartItemType[],
  subtotal: number,
  shipping: number
) => {
  try {
    const res = await axios.post(`${apiUrl}/email/send`, {
      email,
      items,
      subtotal,
      shipping
    });

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};
