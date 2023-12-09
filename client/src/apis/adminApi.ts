import axios from 'axios';

import { apiUrl } from '../config';
import { ProductData } from '../types';

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

export const getProduct = async (productId: string) => {
  try {
    const res = await axios.get(`${apiUrl}/admin/products/${productId}`);

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

export const updateProductData = async (
  productId: string,
  productData: ProductData
) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/products/${productId}/data`, {
      productData
    });

    return res.data;
  } catch (err) {
    // TODO: Handle error
  }
};

export const updateProductDrop = async (
  productId: string,
  dropName: string
) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/products/${productId}/drop`, {
      dropName
    });

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
