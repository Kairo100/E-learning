import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './Payementform';


const stripePromise = loadStripe('YOUR_PUBLIC_STRIPE_KEY');

const Payments: React.FC = () => {
  return (
    <div className="app">
      <h1 className="title">Payment Form</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm/>
      </Elements>
    </div>
  );
};

export default Payments;