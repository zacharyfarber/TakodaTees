import React from 'react';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

interface PaymentFormProps {
  setPaymentFormStatus: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ setPaymentFormStatus }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setPaymentFormStatus('complete');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Continue to Review
      </button>
    </form>
  );
};

export default PaymentForm;
