import React, { useState } from 'react';
import axios from 'axios';
// import {} from 'react-csv';

interface StudentExam {
  CourceName: string;
  Total: number;
  Studentname: string;
  SubcourceId: number;
  studentPhone: string;
}

interface Student {
  Id: number;
  Name: string;
  email: string;
  phone: string;
  Amount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  Exam: StudentExam[];
}

const SearchForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [examDetails, setExamDetails] = useState<Student | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get<Student>(
        `http://localhost:5000/api/student/get/studentexam/${phone}`
      );
      setExamDetails(response.data);
      setError('invalid validation please enter your uccurate phone number');
    } catch (error) {
      setExamDetails(null);
      setError('An error occurred while fetching the exam details.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">Student Exam Search</h1>
        <form onSubmit={handleSearch}>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter student phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="px-4 mb-2 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
        {examDetails ? (
          <div className="mt-8">
            <h2 className="mb-2 text-lg font-medium">Exam Details</h2>
            {examDetails.Exam.length > 0 ? (
              examDetails.Exam.map((exam, index) => (
                <div key={index}>
                  <p>
                    <strong>Course Name:</strong> {exam.CourceName}
                  </p>
                  <p>
                    <strong> Score Earned:</strong> {exam.Total}
                  </p>
                  <p>
                    <strong>Student Name:</strong> {exam.Studentname}
                  </p>

                  {index < examDetails.Exam.length - 1 && <hr className="my-4" />}
                </div>
              ))
            ) : (
              <p>No exam details found.</p>
            )}
          </div>
        ) : (
          error && <p className="mt-4 text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;