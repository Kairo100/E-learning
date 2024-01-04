import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payementform.css';

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>(10); // Default amount is 10, you can change it
  const [courseId, setCourseId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCourseId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cor/get/one/${2}`); // Replace with your API endpoint
        setCourseId(response.data.courseId);
      } catch (error) {
        console.error('Error fetching courseId:', error);
      }
    };

    fetchCourseId();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    try {
      const { paymentIntent, error } = await stripe.confirmCardPayment('', {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error('Error creating payment method:', error);
        setIsLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/payment/pay', {
        amount: amount,
        courseId: courseId,
        stripeToken: paymentIntent?.id,
      });

      console.log('Payment successful:', response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error creating payment:', error);
      setIsLoading(false);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <button></button>
      <div className="form-row">
        <label>
          Amount
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Card Details
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </label>
      </div>
      <button className="pay-button" type="submit" disabled={!stripe || isLoading}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default PaymentForm;