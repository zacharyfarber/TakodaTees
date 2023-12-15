// Notes: Make shipping, payment and review p tags into buttons. Persist data over refresh?

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CheckoutCheckIcon from '../components/CheckoutCheckIcon';
import ShippingForm from '../components/ShippingForm';
import CheckoutContext from '../contexts/CheckoutContext';

function CheckoutPage() {
  const { checkoutPage } = useParams();

  const navigate = useNavigate();

  const [shippingFormStatus, setShippingFormStatus] = useState('incomplete');

  const [paymentFormStatus, setPaymentFormStatus] = useState('incomplete');

  const { shippingForm } = useContext(CheckoutContext)!;

  useEffect(() => {
    if (!shippingForm || Object.values(shippingForm).some((value) => !value)) {
      navigate('/checkout/shipping');
    }
  }, []);

  return (
    <div>
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

      <div>
        {checkoutPage === 'shipping' ? (
          <ShippingForm setShippingFormStatus={setShippingFormStatus} />
        ) : checkoutPage === 'payment' ? (
          <p>Payment</p>
        ) : (
          <p>Review</p>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
