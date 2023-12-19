// Notes: Only allow payment with card for now. Add more payment methods later.

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PaymentElement } from '@stripe/react-stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';

import { sendEmail } from '../apis/emailApi';
import { placeOrder } from '../apis/printfulApi';
import CheckoutContext from '../contexts/CheckoutContext';
import useCart from '../hooks/useCart';
import { CartItemType, PrintfulOrderData } from '../types';

function PaymentForm({
  setPaymentFormStatus,
  shippingCost
}: {
  setPaymentFormStatus: React.Dispatch<React.SetStateAction<string>>;
  shippingCost: number;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { getCart, calculateCartSubtotal } = useCart();

  const { shippingForm } = useContext(CheckoutContext)!;

  const cart = getCart();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (!email) {
      setEmailError('required');

      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('invalid');

      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/review`
      },
      redirect: 'if_required'
    });

    if (error) {
      setMessage(error.message as string);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentFormStatus('complete');

      const printfulOrderData: PrintfulOrderData = {
        recipient: {
          name: shippingForm!.name,
          address1: shippingForm!.address,
          city: shippingForm!.city,
          state_code: shippingForm!.state,
          country_code: shippingForm!.country,
          zip: shippingForm!.zipcode,
          email
        },
        items: cart.map((item: CartItemType) => ({
          sync_variant_id: item.item.variant.printfulId,
          quantity: item.count
        }))
      };

      placeOrder(printfulOrderData);

      sendEmail(
        email,
        cart as CartItemType[],
        calculateCartSubtotal(),
        shippingCost
      );

      navigate('/checkout/review');
    } else {
      setMessage('Something went wrong.');
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    setEmailError('');
  }, [email]);

  return (
    <div>
      <div className="mb-3">
        <p className="email-p-tag">Email</p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className={`email-input ${emailError && 'email-input-error'}`}
        />

        {emailError === 'required' && (
          <p className="email-error-message">Email is required</p>
        )}

        {emailError === 'invalid' && (
          <p className="email-error-message">Email is invalid</p>
        )}
      </div>

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />

        <button
          disabled={isProcessing}
          className="h-10 text-white mt-8 rounded-md bg-[#0570de] w-full"
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>

        {message && <div>{message}</div>}
      </form>
    </div>
  );
}

export default PaymentForm;
