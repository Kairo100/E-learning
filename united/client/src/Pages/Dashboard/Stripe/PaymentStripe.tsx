import React, { useEffect } from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import axios from "axios";

interface StripeBtnProps {
  enrollmentId: number;
}

const StripeBtn: React.FC<StripeBtnProps> = ({ enrollmentId }) => {
  const publishableKey = "pk_test_51NuyvmG4wJSbHOuuRuOJd2I3rpHLkZLaAGlaxGBMcXkidCMz7xS1CgFA9NI05btmEF2ruuAFc897ixlc1x0BDdBw00lsphwPRu";

  useEffect(() => {
    // Your code logic here
  }, []);

  const onToken = (token: Token) => {
    const body = {
      amount: 999,
      token: token,
      enrollmentId: enrolmentId // Pass the enrollment ID received as a prop
    };

    axios
      .post("http://localhost:5000/api/payment/pay", body)
      .then((response) => {
        console.log(response);
        alert("Payment Success");
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  return (
    <StripeCheckout
      label="Pay now" // Component button text
      name="Checkout" // Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Go Premium" // Submit button in modal
      amount={999} // Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="https://www.vidhub.co" // Pop-in header image
      billingAddress={false}
    />
  );
};

export default StripeBtn;