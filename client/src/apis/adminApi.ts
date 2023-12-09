import axios from 'axios';

import { apiUrl } from '../config';

export const createDrop = async (dropName: string) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/drops/new`, {
      dropName
    });

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const getDrop = async (dropId: string) => {
  try {
    const res = await axios.get(`${apiUrl}/admin/drops/${dropId}`);

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const getDrops = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/drops`);

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const updateDrop = async (
  dropId: string,
  dropName: string,
  dropAccess: string,
  productsToRemove: string[]
) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/drops/${dropId}`, {
      dropName,
      dropAccess,
      productsToRemove
    });

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const deleteDrop = async (dropId: string) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/drops/${dropId}`);

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const getProducts = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/products`);

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/products/${productId}`);

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};
