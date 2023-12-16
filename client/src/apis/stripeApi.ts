import axios from 'axios';

import { apiUrl } from '../config';

export const createPaymentIntent = async (amount: number) => {
  try {
    const res = await axios.post(`${apiUrl}/stripe/create-payment-intent`, {
      amount
    });

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};
