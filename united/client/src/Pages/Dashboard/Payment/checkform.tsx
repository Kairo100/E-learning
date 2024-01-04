// import React, { useState } from 'react';
// import axios from 'axios';
// import { CardElement, useStripe, useElements } from 'react-stripe-elements';

// const PaymentAPP: React.FC = () => {
//   const [courseId, setCourseId] = useState('');
//   const [amount, setAmount] = useState('');

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     if (!cardElement) {
//       return;
//     }

//     const { token, error } = await stripe.createToken(cardElement);

//     if (error) {
//       console.error('Error creating token:', error);
//       return;
//     }

//     try {
//       const response = await axios.post('/api/payments', {
//         courseId,
//         amount,
//         token: token?.id,
//       });

//       console.log('Payment response:', response.data);
//     } catch (error) {
//       console.error('Error creating payment:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Course Payment</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="courseId">Course ID:</label>
//           <input
//             type="text"
//             id="courseId"
//             value={courseId}
//             onChange={(e) => setCourseId(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="amount">Amount:</label>
//           <input
//             type="text"
//             id="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="card-element">Card Details:</label>
//           <CardElement id="card-element" />
//         </div>
//         <button type="submit">Pay</button>
//       </form>
//     </div>
//   );
// };

// export default PaymentAPP;