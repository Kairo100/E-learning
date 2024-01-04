import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Dialog } from '@mui/material';
import { Add, Close, Payment, PaymentRounded } from '@mui/icons-material';
import { Spin } from 'antd';
interface Course {
  title: string;
  courceId: number;
  price: string;
  Enrollment: Enrollment[];
}

interface Enrollment {
  id: number;
  StudentName: string;
  studentPhone: string | null;
  courceId: number;
  userId: number;
  Isconfirm: boolean;
  createdAt: string;
  updatedAt: string;
}
interface UserInfo {
  id: number;
  givenName: string;
  username: string;
  email: string;
  isPaid: boolean;
  password: string;
  joinedAt: string;
  updatedAt: string;
  isAdmin: boolean;
  IsDeleted: boolean;
  Cource: Course[];
}
const EarningDashboard: React.FC = () => {
  const [id, setId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [confirmedEnrollments, setConfirmedEnrollments] = useState<number>(0);
  const [pendingEnrollments, setPendingEnrollments] = useState<number>(0);
  const [show, setShow] = useState(false);
  const [Amount, setAmount] = useState('');
  const [AccountNumber, setAccountNumber] = useState('');
  const [Method, setMethod] = useState('');
  const [Description, setDescription] = useState('');
  const [courceId, setcourceId] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [chanel, setChanel] = useState('');
  const { userid } = useParams();

  const handleShow = () => {
    setShow(!show);
  };

  const userInfoString = localStorage.getItem('userInfo');

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
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchCourses();
  }, [userInfoString]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      AccountNumber,
      Amount,
      chanel,
      id,
      courceId,
      Description,
      Method,
    };
    try {
      const response = await axios.post(
        `http://localhost:2000/api/Request/new`,
        data
      );
      handleShow();
    } catch (error) {
      console.error('Error submitting payment request:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedId = localStorage.getItem('id');
        if (storedId) {
          setId(Number(storedId));
        } else {
          const userInfoString = localStorage.getItem('userInfo');
          if (userInfoString) {
            const userInfo: UserInfo = JSON.parse(userInfoString);
            setId(userInfo.id);
          }
        }

        if (id) {
          const response = await axios.get(
            `http://localhost:2000/api/user/dashboardteacher/${id}`
          );
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (userInfo) {
      let confirmedCount = 0;
      let pendingCount = 0;

      userInfo.Cource.forEach((course) => {
        course.Enrollment.forEach((enrollment) => {
          if (enrollment.Isconfirm) {
            confirmedCount++;
          } else {
            pendingCount++;
          }
        });
      });

      setConfirmedEnrollments(confirmedCount);
      setPendingEnrollments(pendingCount);
    }
  }, [userInfo]);

  const calculateTotalPrice = (course: Course): number => {
    let totalPrice = 0;

    course.Enrollment.forEach((enrollment) => {
      if (enrollment.Isconfirm) {
        totalPrice += parseInt(course.price);
      }
    });

    return totalPrice;
  };

  const calculateTotalEarnings = (): number => {
    let totalEarnings = 0;

    userInfo?.Cource.forEach((course) => {
      totalEarnings += calculateTotalPrice(course);
    });

    return totalEarnings;
  };

  if (!userInfo) {
    return <div className="text-center">
      <Spin />
    </div>;
  }
  return (
    <div className="container w-[99%]  border  bg-white rounded p-2 m-1">
 <div className="flex justify-between">
 <h1 className="text-2xl font-bold ">Welcome, {userInfo.givenName}!</h1>

 <h1 style={{cursor:'pointer'}} className='bg-green-200 text-center text-purple-600  rounded hover:bg-green-400 hover:text-white p-2' onClick={handleShow}>$ Request Payment</h1>
 </div>
 <td className="py-2 ">Total Earning:  ${calculateTotalEarnings()}</td>
      {userInfo.Cource.map((course) => (
          
          <div key={course.courceId} className="">
            
            <table className="w-full">
            
              <tbody>
                <tr>
               
                 
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      <div className="md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {userInfo.Cource.map((course) => (
          
          <div key={course.courceId} className="bg-white rounded-lg p-4 border">
            
            <table className="w-full">
            
              <tbody>
                <tr>
                  <td className="py-2 text-right ml-0">{course.title}</td>
                  <td className="py-2 text-right">Amount: ${calculateTotalPrice(course)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Dialog open={show} onClose={handleShow}>
  <div className="flex w-[370px] items-center bg-white">
    <div className="p-6 w-full bg-white rounded shadow">
      <div className="flex justify-between">
        <p className="text-xl font-bold bg-blue-200 text-blue-500 px-4 rounded"><PaymentRounded/></p>
        <p
          style={{ cursor: 'pointer', color: 'gray', fontSize: '18px' }}
          onClick={handleShow}
        >
          <Close />
        </p>
      </div>
      <h1 className="mb-6 text-2xl font-bold text-center"></h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="courceId" className="block  font-semibold">
            Select Course:
          </label>
          <select
            id="courceId"
            value={courceId}
            onChange={(e) => setcourceId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Course</option>
            {userInfo.Cource.map((course) => (
              <option key={course.courceId} value={course.courceId}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <label htmlFor="AccountNumber" className="block  font-semibold">
            Account Number:
          </label>
          <input
            type="text"
            id="AccountNumber"
            value={AccountNumber}
            placeholder="Write your account number"
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="">
          <label htmlFor="Amount" className="block  font-semibold">
            Amount:
          </label>
          <input
            type="number"
            id="Amount"
            value={Amount}
            placeholder="amount e.g $100"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="">
          <label htmlFor="chanel" className="block  font-semibold">
            Chanel:
          </label>
          <select
            id="method"
            value={chanel}
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setChanel(e.target.value)}
          >
            <option value="">Select Chanel</option>
            <option value="sh">Zaad</option>
            <option value="$">Edahab</option>
            <option value="$">Master card</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="courceId" className="block  font-semibold">
            Description:
          </label>
          <input
            type="text"
            id="Description"
            value={Description}
            placeholder="Write your description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
        >
          Send Request  
        </button>
      </form>
    </div>
  </div>
</Dialog>
    </div>
  );
};

export default EarningDashboard;