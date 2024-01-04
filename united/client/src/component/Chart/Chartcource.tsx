import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Course {
  courceId: number;
  Name: string | null;
  Shortdescription: string;
  content: string;
  title: string;
  price: string;
  imageUrl: string;
  isDeleted: boolean;
  videoUrl: string;
  id: number;
  isPublished: boolean;
  createdAt: string;
  UpadatedAt: string;
  CategoryId: number;
  Enrollment: Enrollment[];
}

interface Enrollment {
  id: number;
  StudentName: string;
  studentPhone: string | null;
  isDeleted: boolean;
  courseId: number;
  userId: number;
  Isconfirm: boolean;
  createdAt: string;
  updatedAt: string;
}

const ChartCources: React.FC = () => {
  const [chartData, setChartData] = useState<Course[]>([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get<Course[]>('http://localhost:5000/api/cor/cource/chart');
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const getEnrollmentCount = (courseId: number) => {
    const course = chartData.find((item) => item.courceId !== courseId);
    return course ? course.Enrollment.length : 0;
  };

  return (
    <div className='shadow w-full p-4 bg-blue-400'>
      <h2>Course Enrollment Chart</h2>
      <BarChart width={1000} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={getEnrollmentCount} fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ChartCources;