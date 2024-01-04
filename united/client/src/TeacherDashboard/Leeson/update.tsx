import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { useParams } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom'
import { FaBackward } from 'react-icons/fa';

interface UserInfo {
  id: number;
  // Add other properties if present in your userInfo object
}


const UpdateLesson: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const navigate=useNavigate()
  const [sectionId, setSectionId] = useState<number>();

  const { id } = useParams();


  useEffect(() => {
    axios
      .get('http://localhost:2000/api/section/get/one/lesson/' + id)
      .then((res) => {
        // setCourseId(res.data.courceId);
        setTitle(res.data.title)
        setSectionId(res.data.id)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
    
 
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

 
    try {
      const uploadData = new FormData();
      uploadData.append('videoUrl', videoUrl);
      uploadData.append('id', String(id));
      uploadData.append('sectionId', String(sectionId));
      uploadData.append('title', title);

      const response = await axios.put('http://localhost:2000/api/lesson/update/'+id, uploadData);
      navigate('/teacherDashboard/Cources')
      setSectionId(response.data.sectionId);
    } catch (error) {
      console.error('Failed to upload video or image', error);
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedVideo = e.target.files[0];
      setVideoUrl(selectedVideo);
      setVideoPreview(URL.createObjectURL(selectedVideo));
    }
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/category/all');
        if (response.data.isSuccess) {
          // setCategories(response.data.result);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

const hadleback=()=>{
  navigate('/teacherDashboard/Cources')
}
  return (
    <div className="container bg-white border rounded mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="border border-dashed border-blue-500 p-4">
            <input
              className="bg-white"
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
            />
            {videoPreview && (
              <video width="320" height="240" controls>
                <source src={videoPreview} type="video/mp4" />
              </video>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block font-bold">
            Title
          </label>
          <input
            className="border border-gray-400 p-2 w-full"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
       
          <input
            className="border border-gray-400 p-2 w-full"
            id="sectionId"
            value={sectionId}

            readOnly
          />
        </div>

        <div className="flex gap-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            <Edit/>
          </button>
          <button onClick={hadleback} className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            <FaBackward/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLesson;