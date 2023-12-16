import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import shippingCodes from '../assets/data/shipping_codes.json';
import CheckoutContext from '../contexts/CheckoutContext';
import { Country, State } from '../types';
import ShippingFormIncompleteIcon from './ShippingFormIncompleteIcon';

const ShippingForm = ({
  setShippingFormStatus
}: {
  setShippingFormStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [states, setStates] = useState<State[]>([]);

  const { shippingForm, setShippingForm } = useContext(CheckoutContext)!;

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zipcode: Yup.string().required('Required')
  });

  const handleCountryChange = (
    setFieldValue: (
      field: string,
      value: string | number | boolean,
      shouldValidate?: boolean
    ) => void,
    countryIso2: string
  ) => {
    const country = (shippingCodes as Country[]).find(
      (country: Country) => country.iso2 === countryIso2
    );

    setStates(country ? country.states : []);

    setFieldValue('state', '');
  };

  useEffect(() => {
    if (shippingForm?.country) {
      const country = (shippingCodes as Country[]).find(
        (country: Country) => country.iso2 === shippingForm.country
      );

      setStates(country ? country.states : []);
    }
  }, [pathname]);

  return (
    <Formik
      initialValues={
        shippingForm || {
          name: '',
          address: '',
          city: '',
          country: '',
          state: '',
          zipcode: ''
        }
      }
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (!setShippingForm) {
          throw new Error('setShippingForm is not defined');
        }

        setShippingForm(values);
        setShippingFormStatus('complete');
        navigate('/checkout/payment');
      }}
    >
      {({ setFieldValue, values, errors }) => (
        <Form className="flex flex-col gap-5 w-[90%] mx-auto">
          <div className="w-full">
            <p className="font-nanum text-2xl text-center">Name</p>

            <div className="relative">
              <Field className="shippingFormInput" name="name" type="text" />

              {errors.name && (
                <ShippingFormIncompleteIcon className="absolute top-1/2 right-1 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <div>
            <p className="font-nanum text-2xl text-center">Address</p>

            <div className="relative">
              <Field className="shippingFormInput" name="address" type="text" />

              {errors.address && (
                <ShippingFormIncompleteIcon className="absolute top-1/2 right-1 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <div>
            <p className="font-nanum text-2xl text-center">City</p>

            <div className="relative">
              <Field className="shippingFormInput" name="city" type="text" />

              {errors.city && (
                <ShippingFormIncompleteIcon className="absolute top-1/2 right-1 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <div>
            <p className="font-nanum text-2xl text-center">Country</p>

            <div className="relative">
              <Field
                className="shippingFormInput pr-4 border-r-2 border-transparent"
                as="select"
                name="country"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue('country', e.target.value);
                  handleCountryChange(setFieldValue, e.target.value);
                }}
              >
                <option value="">Select Country</option>
                {(shippingCodes as Country[]).map((country: Country) => (
                  <option key={country.id} value={country.iso2}>
                    {country.name}
                  </option>
                ))}
              </Field>

              {errors.country && (
                <ShippingFormIncompleteIcon className="absolute top-1/2 right-1 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <div>
            <p className="font-nanum text-2xl text-center">State</p>

            <div className="relative">
              <Field
                className="shippingFormInput"
                as="select"
                name="state"
                disabled={!values.country}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.state_code}>
                    {state.name}
                  </option>
                ))}
              </Field>

              {errors.state && (
                <ShippingFormIncompleteIcon className="absolute top-1/2 right-1 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <div>
            <p className="font-nanum text-2xl text-center">Zipcode</p>

            <div className="relative">
              <Field className="shippingFormInput" name="zipcode" type="text" />

              {errors.zipcode && (
                <ShippingFormIncompleteIcon className="absolute top-1/2 right-1 transform -translate-y-1/2" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 bg-[#D9D9D9] w-[66%] mx-auto h-10 text-2xl font-nanum hover:bg-[#bbbbbb]"
          >
            Continue to Payment
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ShippingForm;
