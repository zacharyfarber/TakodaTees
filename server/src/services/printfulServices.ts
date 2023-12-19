import axios from 'axios';
import dotenv from 'dotenv';

import ProductModel from '../models/ProductModel';
import VariantModel from '../models/VariantModel';
import {
  PrintfulCreateProductApiResponse,
  PrintfulGetProductApiResponse,
  PrintfulOrderData,
  PrintfulSyncVariant
} from '../types';

dotenv.config();

const getProduct = async (productId: number) => {
  const {
    data: {
      result: { sync_product, sync_variants }
    }
  } = await axios.get<PrintfulGetProductApiResponse>(
    `https://api.printful.com/store/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
        'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
      }
    }
  );

  return { sync_product, sync_variants };
};

export const createProduct = async (
  productData: PrintfulCreateProductApiResponse
) => {
  const { sync_product, sync_variants } = await getProduct(
    productData.data.sync_product.id
  );

  const newProduct = new ProductModel({
    name: sync_product.name
  });

  const savedProduct = await newProduct.save();

  const newVariants = sync_variants.map((variant: PrintfulSyncVariant) => {
    return new VariantModel({
      printfulId: variant.id,
      name: variant.name,
      product: savedProduct._id
    });
  });

  const savedVariants = await VariantModel.insertMany(newVariants);

  savedProduct.variants = savedVariants.map((variant) => variant._id);

  await savedProduct.save();

  return savedProduct;
};

export const placeOrder = async (orderData: PrintfulOrderData) => {
  const res = await axios.post('https://api.printful.com/orders', orderData, {
    params: {
      confirm: true
    },
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
      'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
    }
  });

  return res.data;
};
