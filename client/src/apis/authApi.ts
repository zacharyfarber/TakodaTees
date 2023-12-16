import axios from 'axios';

import { apiUrl } from '../config';

export const attemptLogin = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/attempt-login`, {
      username,
      password
    });

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const validateToken = async (token: string) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/validate-token`, {
      token
    });

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};
