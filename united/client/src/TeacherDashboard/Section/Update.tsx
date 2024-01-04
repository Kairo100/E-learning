import { Cancel, Edit } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const UpdateSection = () => {
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [courseId, setcourseId] = useState('');
  const navigate=useNavigate()
  useEffect(() => {
    const fetchSection = async () => {
      const response = await axios.get(`http://localhost:2000/api/section/get/one/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setcourseId(response.data.courseId);
    };
    fetchSection();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`http://localhost:2000/api/section/update/${id}`, { title,courseId, description });
    navigate('/teacherDashboard/Cources')
  };
const handleback=()=>[
  navigate('/teacherDashboard/Cources')
]
  return (
    <div className="p-2" style={{width:'100%'}}>
      <form className="bg-white border  rounded px-8 pb-8 w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-bold mb-6">Update Section</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={4}
            required
          />
        </div>
        <div className="flex gap-4 items-center ">
          <button
            className="bg-purple-500  hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <Edit/>
          </button>
          <button
            className="bg-orange-500  hover:bg-orange-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleback}
          >
            <Cancel/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSection;