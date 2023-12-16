import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PaymentElement } from '@stripe/react-stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';

import useCart from '../hooks/useCart';

function PaymentForm({
  setPaymentFormStatus,
  setPaymentAmount
}: {
  setPaymentFormStatus: React.Dispatch<React.SetStateAction<string>>;
  setPaymentAmount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const { calculateCartSubtotal } = useCart();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

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
      navigate('/checkout/review');
    } else {
      setMessage('Something went wrong.');
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    setPaymentAmount(
      (calculateCartSubtotal() + calculateCartSubtotal() * 0.08) * 100
    );
  }, []);

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement />

        <button disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>

        {message && <div>{message}</div>}
      </form>
    </div>
  );
}

export default PaymentForm;
