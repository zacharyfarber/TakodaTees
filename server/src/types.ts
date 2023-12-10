export interface PrintfulSyncProduct {
  name: string;
}

export interface PrintfulSyncVariant {
  id: number;
  name: string;
}

export interface PrintfulGetProductApiResponse {
  result: {
    sync_product: PrintfulSyncProduct;
    sync_variants: PrintfulSyncVariant[];
  };
}

export interface PrintfulCreateProductApiResponse {
  data: {
    sync_product: {
      id: number;
    };
  };
}

export interface Drop {
  _id: string;
  name: string;
  access: string;
  products: Product[] | string[];
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  colors: { [key: string]: string };
  sizes: string[];
  images: { [key: string]: string };
  description: string;
  details: string;
  category: string;
  keywords: string[];
  drop: Drop | string;
  variants: Variant[] | string[];
}

export interface Variant {
  _id: string;
  printfulId: number;
  name: string;
  product: Product | string;
}

export interface ProductData {
  name: string;
  price: number;
  colors: { [key: string]: string };
  sizes: string[];
  description: string;
  details: string;
  category: string;
  keywords: string;
  drop: string;
}
