import { createContext } from 'react';

import { CheckoutContext } from '../types';

const CheckoutContext = createContext<CheckoutContext | null>(null);

export default CheckoutContext;
