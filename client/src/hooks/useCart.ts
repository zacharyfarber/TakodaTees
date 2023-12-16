import { useContext, useReducer } from 'react';

import CartContext from '../contexts/CartContext';
import { CartItemType, Product } from '../types';

type State = CartItemType[];
type Action =
  | { type: 'increase'; _id: string }
  | { type: 'decrease'; _id: string }
  | { type: 'update'; _id: string; count: number }
  | { type: 'remove'; _id: string };

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'remove':
      return state.filter((item) => item.item.variant._id !== action._id);
    case 'increase':
      return state.map((item) =>
        item.item.variant._id === action._id
          ? { ...item, count: item.count + 1 }
          : item
      );
    case 'decrease':
      return state.map((item) =>
        item.item.variant._id === action._id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
    case 'update':
      return state.map((item) =>
        item.item.variant._id === action._id
          ? { ...item, count: action.count }
          : item
      );
    default:
      return state;
  }
}

function useCart() {
  const { setCartKey } = useContext(CartContext)!;

  const cartItem = sessionStorage.getItem('cart');

  let cart = cartItem ? JSON.parse(cartItem) : [];

  const [, dispatch] = useReducer(cartReducer, cart);

  function getCart() {
    return cart;
  }

  function calculateCartSubtotal() {
    let subtotal = 0;

    cart.forEach(
      ({
        item: { product },
        count
      }: {
        item: { product: Product };
        count: number;
      }) => (subtotal += product.price * count)
    );

    return subtotal;
  }

  function calculateProductCount() {
    let count = 0;

    cart.forEach(({ count: itemCount }: { count: number }) => {
      count += itemCount;
    });

    return count;
  }

  function addToCart(item: CartItemType['item']) {
    const index = cart.findIndex(
      (cartItem: CartItemType) => cartItem.item.variant._id === item.variant._id
    );

    if (index >= 0) {
      cart[index].count += 1;
    } else {
      cart.push({ item, count: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    setCartKey(Date.now());
  }

  function removeFromCart(_id: string) {
    const index = cart.findIndex(
      (cartItem: CartItemType) => cartItem.item.variant._id === _id
    );

    if (index >= 0) {
      cart = [...cart.slice(0, index), ...cart.slice(index + 1)];

      sessionStorage.setItem('cart', JSON.stringify(cart));

      dispatch({ type: 'remove', _id });
    }
  }

  function updateCartItemQuantity(_id: string, quantity: number) {
    if (quantity < 1) {
      quantity = 1;
    }

    const index = cart.findIndex(
      (cartItem: CartItemType) => cartItem.item.variant._id === _id
    );

    if (index >= 0) {
      cart[index].count = quantity;
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    dispatch({ type: 'update', _id, count: quantity });
  }

  function increaseCartItemQuantity(_id: string) {
    const index = cart.findIndex(
      (cartItem: CartItemType) => cartItem.item.variant._id === _id
    );

    if (index >= 0) {
      cart[index].count += 1;
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    dispatch({ type: 'increase', _id });
  }

  function decreaseCartItemQuantity(_id: string) {
    const index = cart.findIndex(
      (cartItem: CartItemType) => cartItem.item.variant._id === _id
    );

    if (index >= 0) {
      cart[index].count > 1
        ? (cart[index].count -= 1)
        : (cart[index].count = 1);
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    dispatch({ type: 'decrease', _id });
  }

  return {
    getCart,
    calculateCartSubtotal,
    calculateProductCount,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity
  };
}

export default useCart;
