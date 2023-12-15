import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import shippingCodes from '../assets/data/shipping_codes.json';
import CheckoutContext from '../contexts/CheckoutContext';
import { Country, State } from '../types';

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
      {({ setFieldValue, values }) => (
        <Form className="flex flex-col gap-5">
          <Field name="name" type="text" />
          <ErrorMessage name="name" />

          <Field name="address" type="text" />
          <ErrorMessage name="address" />

          <Field name="city" type="text" />
          <ErrorMessage name="city" />

          <Field
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
          <ErrorMessage name="country" />

          <Field as="select" name="state" disabled={!values.country}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.state_code}>
                {state.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="state" />

          <Field name="zipcode" type="text" />
          <ErrorMessage name="zipcode" />

          <button type="submit">Continue to Payment</button>
        </Form>
      )}
    </Formik>
  );
};

export default ShippingForm;
