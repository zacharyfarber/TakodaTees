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
    let counter = 1;

    return cart.map((cartItem: CartItemType) => {
      counter++;

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
        <div
          key={variantName}
          className={`flex my-3 h-[6.25rem] items-center justify-between ${
            counter % 2 === 1 ? 'bg-[#F0F0F0]' : 'bg-[#000000]'
          } mr-5 font-nanum`}
        >
          <button onClick={() => removeFromCart(variantId)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="6.25rem"
              viewBox="0 0 25 100"
              fill="none"
            >
              <rect
                width="25"
                height="6.25rem"
                fill={counter % 2 === 0 ? '#F0F0F0' : '#000000'}
              />

              <path
                d="M6.04167 60.3333C5.77515 60.3333 5.50863 60.1915 5.30518 59.9078C4.89827 59.3405 4.89827 58.4214 5.30518 57.8541L17.8052 40.4255C18.2121 39.8582 18.8713 39.8582 19.2782 40.4255C19.6851 40.9928 19.6851 41.9119 19.2782 42.4793L6.77816 59.9078C6.57471 60.1915 6.30819 60.3333 6.04167 60.3333Z"
                fill={counter % 2 === 1 ? '#F0F0F0' : '#000000'}
              />

              <path
                d="M18.5417 60.3333C18.2751 60.3333 18.0086 60.1915 17.8052 59.9078L5.30518 42.4793C4.89827 41.9119 4.89827 40.9928 5.30518 40.4255C5.71208 39.8582 6.37126 39.8582 6.77816 40.4255L19.2782 57.8541C19.6851 58.4214 19.6851 59.3405 19.2782 59.9078C19.0747 60.1915 18.8082 60.3333 18.5417 60.3333Z"
                fill={counter % 2 === 1 ? '#F0F0F0' : '#000000'}
              />
            </svg>
          </button>

          <div className="h-20 w-20 ml-5">
            <LazyImage src={image} alt={variantName} />
          </div>

          <div className="mx-5 w-[55%]">
            <p
              className={`${
                counter % 2 === 0
                  ? 'bg-[#F0F0F0] text-black'
                  : 'bg-[#000000] text-white'
              } mb-2 px-2 h-[2rem] flex items-center text-2xl`}
            >
              {productName}
            </p>

            <div className="flex justify-between">
              <p
                className={`${
                  counter % 2 === 0
                    ? 'bg-[#F0F0F0] text-black'
                    : 'bg-[#000000] text-white'
                } px-2 h-[2rem] flex items-center text-2xl`}
              >
                {color}
              </p>

              <p
                className={`${
                  counter % 2 === 0
                    ? 'bg-[#F0F0F0] text-black'
                    : 'bg-[#000000] text-white'
                } px-2 h-[2rem] flex items-center text-2xl`}
              >
                {size}
              </p>
            </div>
          </div>

          <div className="w-[35%] flex justify-evenly">
            <p
              className={`${
                counter % 2 === 0
                  ? 'bg-[#F0F0F0] text-black'
                  : 'bg-[#000000] text-white'
              } mx-5 text-5xl text-center h-[5rem] w-[5rem] flex items-center justify-center`}
            >
              ${price}
            </p>

            <div
              className={`${
                counter % 2 === 0
                  ? 'bg-[#F0F0F0] text-black'
                  : 'bg-[#000000] text-white'
              } flex`}
            >
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) =>
                  updateCartItemQuantity(variantId, parseInt(e.target.value))
                }
                className={`w-[25%] appearance-none focus:outline-none ${
                  counter % 2 === 0
                    ? 'bg-[#F0F0F0] text-black'
                    : 'bg-[#000000] text-white'
                } text-5xl text-center h-[5rem] w-[4rem]`}
              />

              <div className="flex flex-col justify-center">
                <button
                  className="h-5 w-[1rem] mr-4 my-1.5 text-3xl"
                  onClick={() => increaseCartItemQuantity(variantId)}
                >
                  +
                </button>

                <button
                  className="h-5 w-[1rem] mr-4 my-1.5 text-3xl mb-4"
                  onClick={() => decreaseCartItemQuantity(variantId)}
                >
                  -
                </button>
              </div>
            </div>
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
      <div onMouseEnter={() => setCartOpen(true)} className="flex h-6 ml-5">
        <CartIcon />

        <p className="text-[#F0F0F0]">{calculateProductCount()}</p>
      </div>

      <div
        key={cartKey}
        ref={cartRef}
        className={`${
          cartOpen ? '!visible' : '!hidden'
        } absolute w-[99%] right-[.5%] bg-white top-12 z-50 border-t-[.5rem] border-[#F0F0F0]]`}
      >
        <div className="border-b-[.5rem] border-black border-x-[.5rem]">
          <div className="h-12 flex items-center border-black border-[.125rem]">
            <span className="navbar-start"></span>

            <p className="navbar-center font-nanum text-3xl">Cart Summary</p>

            <button
              onClick={() => setCartOpen(false)}
              className="text-red-500 navbar-end text-right mr-5"
            >
              X
            </button>
          </div>

          <div className="flex items-center justify-between border-black border-x-[.5rem]">
            <div className="w-[67.5%]">{renderCartContents()}</div>

            <div className="mr-5 w-[30%] border-black border p-5 font-sahitya ">
              <div className="flex text-xl text-center">
                <p className="ml-6 w-[35%] text-center">Subtotal</p>

                <p className="ml-auto mr-6">${calculateCartSubtotal()}</p>
              </div>

              <div className="flex text-xl text-center my-3">
                <p className="ml-6 w-[35%] text-center">Estimated Tax</p>

                <p className="ml-auto mr-6">
                  ${calculateCartSubtotal() * 0.08}
                </p>
              </div>

              <div className="flex text-xl text-center">
                <p className="ml-6 w-[35%] text-center">Total</p>

                <p className="ml-auto mr-6">
                  ${calculateCartSubtotal() + calculateCartSubtotal() * 0.08}
                </p>
              </div>

              <div className="flex justify-center items-center mx-auto text-center bg-black text-white w-[45%] h-10 text-m mt-5">
                <Link to="/checkout">Check Out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
