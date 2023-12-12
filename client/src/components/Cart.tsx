import { useContext, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import CartContext from '../contexts/CartContext';
import useCart from '../hooks/useCart';
import { CartItemType } from '../types';
import CartIcon from './CartIcon';
import LazyImage from './LazyImage';

function Cart() {
  const cartRef = useRef<HTMLDivElement>(null);

  const { cartKey, cartOpen, setCartOpen } = useContext(CartContext)!;

  const location = useLocation();

  const {
    calculateProductCount,
    getCart,
    updateCartItemQuantity,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeFromCart,
    calculateCartSubtotal
  } = useCart();

  const cart = getCart();

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setCartOpen(false);
    }
  };

  const renderCartContents = () => {
    return cart.map((cartItem: CartItemType) => {
      const { item, count } = cartItem;

      const {
        product: { name: productName, images, price },
        variant: { _id: variantId, name: variantName },
        color,
        size
      } = item;

      let image = '';

      if (images) {
        if (color) {
          image = images[color].split(',').filter((image) => {
            return (
              image.includes('thumbnail') && !image.includes('color_thumbnail')
            );
          })[0];
        } else {
          image = Object.values(images)[0]
            .split(',')
            .filter((image) => {
              return (
                image.includes('thumbnail') &&
                !image.includes('color_thumbnail')
              );
            })[0];
        }
      }

      return (
        <div key={variantName}>
          <button onClick={() => removeFromCart(variantId)}>Remove Item</button>

          <div className="h-20 w-20">
            <LazyImage src={image} alt={variantName} />
          </div>

          <div>
            <p>{productName}</p>

            <div>
              <p>{color}</p>

              <p>{size}</p>
            </div>
          </div>

          <p>${price}</p>

          <div>
            <input
              type="number"
              min={1}
              value={count}
              onChange={(e) =>
                updateCartItemQuantity(variantId, parseInt(e.target.value))
              }
            />

            <button onClick={() => increaseCartItemQuantity(variantId)}>
              +
            </button>

            <button onClick={() => decreaseCartItemQuantity(variantId)}>
              -
            </button>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDownEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCartOpen(false);
      }
    };

    if (cartOpen) {
      document.addEventListener('keydown', handleKeyDownEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDownEscape);
    };
  }, [cartOpen]);

  useEffect(() => {
    setCartOpen(false);
  }, [location]);

  return (
    <div>
      <div onMouseEnter={() => setCartOpen(true)}>
        <CartIcon />

        <p>{calculateProductCount()}</p>
      </div>

      <div
        key={cartKey}
        ref={cartRef}
        className={cartOpen ? '!visible' : '!hidden'}
      >
        <div>
          <p>Cart Summary</p>

          <button onClick={() => setCartOpen(false)}>X</button>
        </div>

        <div>
          <div>{renderCartContents()}</div>

          <div>
            <div>
              <p>Subtotal</p>

              <p>${calculateCartSubtotal()}</p>
            </div>

            <div>
              <p>Estimated Tax</p>

              <p>${calculateCartSubtotal() * 0.08}</p>
            </div>

            <div>
              <p>Total</p>

              <p>${calculateCartSubtotal() + calculateCartSubtotal() * 0.08}</p>
            </div>

            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
