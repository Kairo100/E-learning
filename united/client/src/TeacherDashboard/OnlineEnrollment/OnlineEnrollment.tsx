import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useParams ,useNavigate} from 'react-router-dom';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import logo from './Were.png';

interface UserInfo {
  id: number;
}

const OnlineEnrollment = () => {
  const publishableKey =
    'pk_test_51NuyvmG4wJSbHOuuRuOJd2I3rpHLkZLaAGlaxGBMcXkidCMz7xS1CgFA9NI05btmEF2ruuAFc897ixlc1x0BDdBw00lsphwPRu';

  const userInfoString = localStorage.getItem('userInfo');
  const { id } = useParams();
  const [userId, setUserId] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [courseId, setCourseId] = useState('');
  const [amount, setAmount] = useState(0);
  const [studentName, setStudentName] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      userId,
      StudentName: studentName,
      courseId,
    };
    axios
      .post('http://localhost:2000/api/onlineEnrollment/new', data)
      .then((response) => {
        const enrollmentId = response.data.id;
        localStorage.setItem('enrollmentId', enrollmentId.toString());
       
      })
      .catch((err) => {
        alert(err);
      });
  };


  useEffect(() => {
    const fetchCourses = async () => {
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        try {
          const response = await axios.get(
            `http://localhost:2000/api/user/get/one/${userInfo.id}`
          );
          setUserId(response.data.id);
        } catch (error) {
          // Handle error
        }
      }
    };
    fetchCourses();
  }, [userInfoString]);

  useEffect(() => {
    const fetchCourseId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/cource/get/one/${id}`
        );
        setCourseId(response.data.courceId);
        setAmount(response.data.price);
      } catch (error) {
        console.log('Error:', error);
       
      }
    };
    fetchCourseId();
  }, [id]);

  const onToken = (token: Token) => {
    const enrollmentId = localStorage.getItem('enrollmentId');
    const body = {
      amount: amount,
      token: token,
      enrollmentId: enrollmentId,
    };
  
    axios
      .post('http://localhost:2000/api/payment/pay', body)
      .then((response) => {
        navigate(`/cource/${courseId}`)
        setPaymentSuccess(true); // Set payment success state to true
      })
      .catch((error) => {
        console.log('Payment Error: ', error);
        alert('Payment Error');
      });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'StudentName') {
      setStudentName(value);
    } else if (name === 'studentPhone') {
      setStudentPhone(value);
    }
  };

  useEffect(() => {
    setIsFormValid(studentName !== '' && studentPhone !== '');
  }, [studentName, studentPhone]);

  return (
    <div className="flex mt-0 flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        {paymentSuccess ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Thank you for your payment!</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to={`/cource/${id}`}>Start Learning</Link>
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
      
            <input
              type="text"
              id="StudentName"
              name="StudentName"
              value={studentName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded appearance-none"
              required
              placeholder='What is your Name ...'
            />

           
            <input
              type="text"
              id="studentPhone"
              name="studentPhone"
              value={studentPhone}
              placeholder='what is your Phone ......'
              onChange={handleInputChange}
              className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded appearance-none"
              required
            />

            <input type="hidden" name="courseId" value={courseId} readOnly />
            <input type="hidden" value={userId} readOnly />

            <StripeCheckout
              label="Pay now"
              name="Checkout"
              description="Upgrade to a premium account today."
              panelLabel="Go Premium"
              amount={amount * 100} // Convert amount to cents
              token={onToken}
              stripeKey={publishableKey}
              image={logo}
              billingAddress={false}
              disabled={!isFormValid} // Disable button if form is not valid
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default OnlineEnrollment;