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
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CartItemType {
  item: { product: Product; variant: Variant; color?: string; size?: string };
  count: number;
}

export interface State {
  id: number;
  name: string;
  state_code: string;
}

export interface Country {
  id: number;
  name: string;
  iso2: string;
  states: State[];
}

export interface CheckoutContext {
  shippingForm?: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
  };
  setShippingForm?: React.Dispatch<
    React.SetStateAction<{
      name: string;
      address: string;
      city: string;
      state: string;
      zipcode: string;
      country: string;
    }>
  >;
}
