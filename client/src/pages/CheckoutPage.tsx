// Notes: Make shipping, payment and review p tags into buttons. Persist data over refresh? Reset data when leaving checkout page?

import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CheckoutCheckIcon from '../components/CheckoutCheckIcon';
import PaymentForm from '../components/PaymentForm';
import ShippingForm from '../components/ShippingForm';
import CheckoutContext from '../contexts/CheckoutContext';

function CheckoutPage() {
  const { checkoutPage } = useParams();

  const navigate = useNavigate();

  const [shippingFormStatus, setShippingFormStatus] = useState('incomplete');

  const [paymentFormStatus, setPaymentFormStatus] = useState('incomplete');

  const { shippingForm, setPaymentAmount } = useContext(CheckoutContext)!;

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

      <div className="flex justify-between h-[66vh]">
        <div className="w-[33%] flex flex-col border-[#1E1E1E] border p-5 h-full">
          {checkoutPage === 'shipping' ? (
            <div>
              <p className="text-center">Shipping Details</p>

              <ShippingForm setShippingFormStatus={setShippingFormStatus} />
            </div>
          ) : checkoutPage === 'payment' ? (
            <div>
              <p className="text-center">Payment Details</p>

              <PaymentForm
                setPaymentFormStatus={setPaymentFormStatus}
                setPaymentAmount={setPaymentAmount}
              />
            </div>
          ) : (
            <p>Review</p>
          )}
        </div>

        <div className="w-[66%] border-[#1E1E1E] border p-5 h-full">
          <p>Order Summary</p>

          <div>Render Cart</div>

          <div>
            <p>Subtotal</p>

            <p>Tax</p>

            <p>Shipping</p>

            <p>Total</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
