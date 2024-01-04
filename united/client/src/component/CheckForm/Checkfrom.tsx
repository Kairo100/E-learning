import React from "react";
import StripeCheckout, { Token } from "react-stripe-checkout";
import axios from "axios";

const CheckoutForm: React.FC = (enrolmentId) => {
  const publishableKey: string =
"pk_test_51OAXFVI1bBefNqsX11CDyQWcB6gAx2zS5AVQIK9plAgMlFlAhi80ja1JoEB2BESvTX3Oh2u4jctZnRXkMsNtBn9300xkbgqbs7";

  const onToken = (token: Token) => {
    const body = {
      amount: 999,
      token: token,
      enrolmentId
    };

    axios
      .post("http://localhost:1234/", body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Payment Error: ", error);
      });
  };

  return (
    <StripeCheckout
      label="Start The Learning" // Component button text
      name="Business LLC" // Modal Header
      description="Upgrade to a premium account today."
      panelLabel="Go Premium" // Submit button in modal
      amount={999} // Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
    />
  );
};

export default CheckoutForm;