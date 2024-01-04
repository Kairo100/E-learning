import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { ButtonBase, Dialog } from '@mui/material';
import { Button } from '@material-ui/core';
import { Close, Payment } from '@mui/icons-material';

interface Course {
  title: string;
  courseId: number;
  price: string;
  courceId:any;
  Enrollment: Enrollment[];
  review: Review[];
}

interface Enrollment {
  id: number;
  StudentName: string;
  studentPhone: string | null;
  courseId: number;
  userId: number;
  Isconfirm: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: number;
  Comment: string;
  review: number;
  Name: string | null;
  UserId: number;
  CourceId: number;
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

const TeacherDashboard: React.FC = () => {
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
          const response = await axios.get(`http://localhost:2000/api/user/dashboardteacher/${id}`);
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!userInfo) {
    return <div className='text-center justify-center'><Spin/></div>;
  }

  const calculateTotalPrice = (course: Course): number => {
    let totalPrice = 0;

    course.Enrollment.forEach((enrollment) => {
      if (enrollment.Isconfirm) {
        totalPrice += parseInt(course.price);
      }
    });

    return totalPrice;
  };

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="border-2 rounded-md m-2 px-4 py-8">
<div className="flex justify-between">
<div>
<h1 className="text-2xl font-bold mb-4">Welcome, {userInfo.givenName}!</h1>
         <p>Your Earning page</p>
</div>
<div>
<button onClick={handleShow} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Request Earned
    </button>
</div>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {userInfo.Cource.map((course) => (
          <div
            key={course.courseId}
            className="text-white border shadow-md bg-blue-600 rounded-lg p-4"
          >
            <h2 className="text-lg font-medium mb-2" style={{ textTransform: 'uppercase' }}>
              {course.title}
            </h2>
            <div className="flex justify-between mb-4">
              <p className="text-white">Price:</p>
              <p className="font-medium">${course.price}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-white">Enrollments:</p>
              <p className="font-medium">{course.Enrollment.length}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p className="text-white">Total Price:</p>
              <p className="font-medium">${calculateTotalPrice(course)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-white">Reviews:</p>
              <p className="font-medium">{course.review.length}</p>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={show} onClose={handleShow}>
  <div className="flex w-[370px] items-center bg-white">
    <div className="p-6 w-full bg-white rounded shadow">
      <div className="flex justify-between">
        <p className="text-xl font-bold text-blue-500 px-4 rounded">Request Money</p>
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

export default TeacherDashboard;