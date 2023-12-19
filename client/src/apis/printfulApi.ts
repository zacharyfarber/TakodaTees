import axios from 'axios';

import { apiUrl } from '../config';
import { PrintfulOrderData } from '../types';

export const placeOrder = async (orderData: PrintfulOrderData) => {
  try {
    const res = await axios.post(`${apiUrl}/printful/orders`, orderData);

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};
