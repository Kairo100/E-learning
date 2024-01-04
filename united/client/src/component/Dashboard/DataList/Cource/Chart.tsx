import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import './chart.css'

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

interface Course {
  courseId: number;
  Name: string | null;
  Shortdescription: string;
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
  Enrollment: Enrollment[];
}

const EnrollmentsChart: React.FC = () => {
  const [enrollments, setEnrollments] = useState<Course[]>([]);

  useEffect(() => {
    fetchEnrollmentsData();
  }, []);

  const fetchEnrollmentsData = async () => {
    try {
      const response = await axios.get<Course[]>("http://localhost:2000/api/cor/cource/chart"); // Replace with your backend API endpoint
      setEnrollments(response.data);
    } catch (error) {
      console.error("Error retrieving enrollments data:", error);
    }
  };

  const chartData = enrollments.map((course) => ({
    courseName: course.title,
    enrollments: course.Enrollment.length,
  }));

  return (
    <div className="containerchartenrollment overflow-x-auto bg-white rounded-lg shadow-lg p-4 mx-4 p-4">
      <div className="">
        <div className="w-full">
          <BarChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="enrollments" fill="blue" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentsChart;