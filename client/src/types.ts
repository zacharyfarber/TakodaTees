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

export interface ProductContext {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
}

export interface CartContext {
  cartKey: number;
  setCartKey: React.Dispatch<React.SetStateAction<number>>;
}

export interface CartItem {
  item: { product: Product; variant: Variant };
  count: number;
}
