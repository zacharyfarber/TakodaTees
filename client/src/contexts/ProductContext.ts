import { createContext } from 'react';

import { ProductContext } from '../types';

const ProductContext = createContext<ProductContext | null>(null);

export default ProductContext;
