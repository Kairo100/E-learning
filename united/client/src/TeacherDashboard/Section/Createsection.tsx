import { Add } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBackward } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const Registersection = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2000/api/cource/get/one/' + id)
      .then((res) => {
        setCourseId(res.data.courceId);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      courseId,
      description,
    };
    axios.post('http://localhost:2000/api/section/Register', data);
    navigate('/teacherDashboard/Cources');
  };

  const handleBack = () => {
    navigate('/teacherDashboard/Cources');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <input
            style={{ fontSize: '0px' }}
            readOnly
            type="text"
            className="hidden"
            value={courseId}
          />
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-1"
            >
              Title section:
            </label>
            <input
              required
              type="text"
              id="title"
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex  gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Add/>
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleBack}
            >
              <FaBackward/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registersection;