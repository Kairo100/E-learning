import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Course {
  courceId: number;
  Name: null | string;
  Shortdescription: null | string;
  content: string;
  title: string;
  price: string;
  imageUrl: string;
  videoUrl: string;
  id: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  CategoryId: number;
}

interface Enrollment {
  id: number;
  StudentName: string;
  studentPhone: null | string;
  courseId: number;
  userId: number;
  Isconfirm: boolean;
  createdAt: string;
  updatedAt: string;
  Cource: Course;
}

interface UserInfo {
  id: number;
}
const StudentDashboard: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const userInfoString = localStorage.getItem('userInfo');
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get<Enrollment[]>('http://localhost:2000/api/user/get/one/studentlesson/1');
        setEnrollments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEnrollments();
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        try {
          const response = await axios.get<Enrollment[]>(
            `http://localhost:2000/api/user/get/one/studentlesson/${userInfo.id}`
          );
          setEnrollments(response.data);
        } catch (error) {
          console.log('Error fetching courses:', error);
        }
      }
    };
    fetchCourses();
  }, [userInfoString]);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    
      {enrollments.map((enrollment) => (
          <Link to={`/cource/${enrollment.Cource.courceId}`}>
          <div key={enrollment.id} className="bg-white p-4 mt-16 rounded-lg shadow">
            <img src={enrollment.Cource.imageUrl} alt="Course Image" className="w-full h-32 ml-[-12px] mt-[6px] object-cover mb-4 rounded-lg" />
            <h2 className="text-lg font-bold mb-2">{enrollment.Cource.title}</h2>
            <p className="text-gray-600">Price: {enrollment.Cource.price}</p>
            
          </div>
          </Link>
        ))}


      </div>
    </div>
  );
};

export default StudentDashboard;