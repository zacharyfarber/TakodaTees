import axios from 'axios';

import { apiUrl } from '../config';

export const getRecentDrops = async () => {
  const res = await axios.get(`${apiUrl}/store/recent-drops`);

  return res.data;
};
