// Notes: Make shipping, payment and review p tags into buttons. Persist data over refresh? Reset data when leaving checkout page? Client Secret changing too often? Edit functionality for changeCartCounter on decrease if item count is 1. Cancel order button.

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { createPaymentIntent } from '../apis/stripeApi';
import CheckoutCheckIcon from '../components/CheckoutCheckIcon';
import LazyImage from '../components/LazyImage';
import PaymentForm from '../components/PaymentForm';
import ShippingForm from '../components/ShippingForm';
import CheckoutContext from '../contexts/CheckoutContext';
import { customToFixed } from '../helpers';
import useCart from '../hooks/useCart';
import { CartItemType } from '../types';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutPage() {
  const { checkoutPage } = useParams();

  const navigate = useNavigate();

  const [shippingFormStatus, setShippingFormStatus] = useState('incomplete');

  const [paymentFormStatus, setPaymentFormStatus] = useState('incomplete');

  const [cartChangeCounter, setCartChangeCounter] = useState(0);

  const { shippingForm, clientSecret, setClientSecret } =
    useContext(CheckoutContext)!;

  const {
    calculateCartSubtotal,
    getCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    updateCartItemQuantity,
    removeFromCart
  } = useCart();

  const cart = getCart();

  useEffect(() => {
    if (!shippingForm || Object.values(shippingForm).some((value) => !value)) {
      navigate('/checkout/shipping');
    }
  }, [clientSecret]);

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

          if (!image)
            image = images[color].split(',').filter((image) => {
              return image.includes('front');
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

          if (!image)
            image = Object.values(images)[0]
              .split(',')
              .filter((image) => {
                return image.includes('front');
              })[0];
        }
      }

      return (
        <div
          key={variantName}
          className="flex my-3 h-[6.25rem] items-center justify-between mr-5 font-nanum"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(variantId);
              setCartChangeCounter(cartChangeCounter + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="6.25rem"
              viewBox="0 0 25 100"
              fill="none"
            >
              <rect width="25" height="6.25rem" fill="none" />

              <path
                d="M6.04167 60.3333C5.77515 60.3333 5.50863 60.1915 5.30518 59.9078C4.89827 59.3405 4.89827 58.4214 5.30518 57.8541L17.8052 40.4255C18.2121 39.8582 18.8713 39.8582 19.2782 40.4255C19.6851 40.9928 19.6851 41.9119 19.2782 42.4793L6.77816 59.9078C6.57471 60.1915 6.30819 60.3333 6.04167 60.3333Z"
                fill="#1E1E1E"
              />

              <path
                d="M18.5417 60.3333C18.2751 60.3333 18.0086 60.1915 17.8052 59.9078L5.30518 42.4793C4.89827 41.9119 4.89827 40.9928 5.30518 40.4255C5.71208 39.8582 6.37126 39.8582 6.77816 40.4255L19.2782 57.8541C19.6851 58.4214 19.6851 59.3405 19.2782 59.9078C19.0747 60.1915 18.8082 60.3333 18.5417 60.3333Z"
                fill="#1E1E1E"
              />
            </svg>
          </button>

          <div className="h-20 w-20 ml-5">
            <LazyImage src={image} alt={variantName} />
          </div>

          <div className="mx-5 w-[55%]">
            <p className="bg-[#1E1E1E] text-[#F0F0F0] mb-2 px-2 h-[2rem] flex items-center text-2xl">
              {productName}
            </p>

            <div className="flex">
              {color && (
                <p className="bg-[#1E1E1E] text-[#F0F0F0] px-2 h-[2rem] flex items-center text-2xl w-[40%] mr-[20%]">
                  {color}
                </p>
              )}

              {size && (
                <p className="bg-[#1E1E1E] text-[#F0F0F0] px-2 h-[2rem] flex items-center text-2xl w-[40%]] flex-grow">
                  {size.toLowerCase() === 's'
                    ? 'Small'
                    : size.toLowerCase() === 'm'
                    ? 'Medium'
                    : size.toLowerCase() === 'l'
                    ? 'Large'
                    : 'Extra Large'}
                </p>
              )}
            </div>
          </div>

          <div className="w-[35%] flex justify-evenly">
            <p className="bg-[#1E1E1E] text-[#F0F0F0] mx-5 text-5xl text-center h-[5rem] w-[5rem] flex items-center justify-center">
              ${price}
            </p>

            <div className="bg-[#1E1E1E] text-[#F0F0F0] flex">
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) => {
                  updateCartItemQuantity(variantId, parseInt(e.target.value));
                  setCartChangeCounter(cartChangeCounter + 1);
                }}
                className="appearance-none focus:outline-none bg-[#1E1E1E] text-[#F0F0F0] text-5xl text-center h-[5rem] w-[4rem]"
              />

              <div className="flex flex-col justify-center">
                <button
                  className="h-5 w-[1rem] mr-4 my-1.5 text-3xl"
                  onClick={() => {
                    increaseCartItemQuantity(variantId);
                    setCartChangeCounter(cartChangeCounter + 1);
                  }}
                >
                  +
                </button>

                <button
                  className="h-5 w-[1rem] mr-4 my-1.5 text-3xl mb-4"
                  onClick={() => {
                    decreaseCartItemQuantity(variantId);
                    setCartChangeCounter(cartChangeCounter + 1);
                  }}
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
    if (shippingForm?.country !== ' US') {
      createPaymentIntent(
        (10 +
          calculateCartSubtotal() +
          parseFloat(customToFixed(calculateCartSubtotal() * 0.1))) *
          100
      ).then((res) => {
        setClientSecret(res.clientSecret);
      });
    } else {
      createPaymentIntent(
        (calculateCartSubtotal() +
          parseFloat(customToFixed(calculateCartSubtotal() * 0.1))) *
          100
      ).then((res) => {
        setClientSecret(res.clientSecret);
      });
    }
  }, [cartChangeCounter]);

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
          key={clientSecret}
        >
          <div className="font-nanum text-3xl flex items-center justify-center text-center my-5 gap-10">
            <p
              className={
                checkoutPage === 'shipping'
                  ? 'underline underline-offset-[0.75rem]'
                  : ''
              }
            >
              Shipping
            </p>

            <CheckoutCheckIcon status={shippingFormStatus} />

            <p
              className={
                checkoutPage === 'payment'
                  ? 'underline underline-offset-[0.75rem]'
                  : ''
              }
            >
              Payment
            </p>

            <CheckoutCheckIcon status={paymentFormStatus} />

            <p
              className={
                checkoutPage === 'review'
                  ? 'underline underline-offset-[0.75rem]'
                  : ''
              }
            >
              Review
            </p>
          </div>

          <div className="flex justify-between h-[75vh]">
            <div className="w-[33%] flex flex-col border-[#1E1E1E] border p-5 h-full">
              {checkoutPage === 'shipping' ? (
                <div>
                  <p className="text-center font-nanum text-3xl underline underline-offset-8 mb-6">
                    Shipping Details
                  </p>

                  <ShippingForm setShippingFormStatus={setShippingFormStatus} />
                </div>
              ) : checkoutPage === 'payment' ? (
                <div>
                  <p className="text-center font-nanum text-3xl underline underline-offset-8 mb-6">
                    Payment Details
                  </p>

                  <PaymentForm setPaymentFormStatus={setPaymentFormStatus} />
                </div>
              ) : (
                <p className="text-center font-nanum text-3xl underline underline-offset-8 mb-6">
                  Review
                </p>
              )}
            </div>

            <div className="w-[66%] border-[#1E1E1E] border py-5 px-8 h-full">
              <p className="font-nanum text-5xl underline underline-offset-8">
                Order Summary
              </p>

              <div className="overflow-y-scroll max-h-[20rem] mt-2 mb-16">
                {renderCartContents()}
              </div>

              <div className="font-nanum text-3xl w-[60%] flex flex-col justify-center items-center mx-auto">
                <div className="flex items-center justify-between w-full">
                  <p className="my-1">SUBTOTAL</p>
                  <p>${calculateCartSubtotal()}</p>
                </div>

                <div className="flex items-center justify-between w-full">
                  <p className="my-1">TAX</p>
                  <p>
                    $
                    {customToFixed(
                      parseFloat(customToFixed(calculateCartSubtotal() * 0.1))
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between w-full">
                  <p className="my-1">SHIPPING</p>
                  {shippingForm?.country === 'US' ? <p>FREE</p> : <p>$10</p>}
                </div>

                <div className="flex items-center justify-between w-full">
                  <p className="my-1">TOTAL</p>
                  {shippingForm?.country === 'US' ? (
                    <p>
                      $
                      {customToFixed(
                        calculateCartSubtotal() +
                          parseFloat(
                            customToFixed(calculateCartSubtotal() * 0.1)
                          )
                      )}
                    </p>
                  ) : (
                    <p>
                      $
                      {customToFixed(
                        calculateCartSubtotal() +
                          parseFloat(
                            customToFixed(calculateCartSubtotal() * 0.1)
                          ) +
                          10
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Elements>
      )}
    </div>
  );
}

export default CheckoutPage;
