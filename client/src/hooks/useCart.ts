import { useContext } from 'react';

import CartContext from '../contexts/CartContext';
import { CartItem, Product } from '../types';

function useCart() {
  const { setCartKey } = useContext(CartContext)!;

  const cartItem = sessionStorage.getItem('cart');

  let cart = cartItem ? JSON.parse(cartItem) : [];

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

  function addToCart(item: CartItem['item']) {
    const index = cart.findIndex(
      (cartItem: CartItem) => cartItem.item.variant._id === item.variant._id
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
      (cartItem: CartItem) => cartItem.item.variant._id === _id
    );

    if (index >= 0) {
      cart = [...cart.slice(0, index), ...cart.slice(index + 1)];

      sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    setCartKey(Date.now());
  }

  function updateCartItemQuantity(_id: string, quantity: number) {
    if (quantity < 1) {
      quantity = 1;
    }

    const index = cart.findIndex(
      (cartItem: CartItem) => cartItem.item.variant._id === _id
    );

    if (index >= 0) {
      cart[index].count = quantity;
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    setCartKey(Date.now());
  }

  return {
    getCart,
    calculateCartSubtotal,
    calculateProductCount,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
  };
}

export default useCart;
