import { createContext } from 'react';

import { CartContext } from '../types';

const CartContext = createContext<CartContext | null>(null);

export default CartContext;
