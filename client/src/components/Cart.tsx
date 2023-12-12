import { useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import CartContext from '../contexts/CartContext';
import useCart from '../hooks/useCart';
import CartIcon from './CartIcon';

function Cart() {
  const cartRef = useRef<HTMLDivElement>(null);

  const { cartKey, cartOpen, setCartOpen } = useContext(CartContext)!;

  const location = useLocation();

  const { calculateProductCount } = useCart();

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCartOpen(false);
      }
    };

    if (cartOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
          <div>Cart Contents</div>

          <div>Checkout Summary</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
