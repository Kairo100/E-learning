import React, { useState } from 'react';
import axios from 'axios';
// import './SearchForm.css';

interface Student {
  id: number;
  Studentname: string;
  studentPhone: string;
  CourceName: string;
  Total: number;
  TakeDate: string;
  UpdateDate: string;
  isDeleted: boolean;
  courseId: number;
  studentId: number;
}

const SearchForm: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [student, setStudent] = useState<Student | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get<Student>(`http://localhost:5000/api/exam/get/one/${phone}`);
      const data = response.data;

      if (data.studentPhone === phone) {
        setStudent(data);
      } else {
        setStudent(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-form-container" style={{marginTop:'700px'}}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {student && (
        <div className="student-details">
          <h2>Student Details</h2>
          <p>Student Name: {student.Studentname}</p>
          <p>Phone: {student.studentPhone}</p>
          <p>Course Name: {student.CourceName}</p>
          <p>Total: {student.Total}</p>
          <p>Take Date: {student.TakeDate}</p>
          <p>Update Date: {student.UpdateDate}</p>
        </div>
      )}
    </div>
  );
};

export default SearchForm;