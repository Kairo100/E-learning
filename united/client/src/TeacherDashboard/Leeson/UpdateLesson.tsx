import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { useParams } from 'react-router-dom';

interface UserInfo {
  id: number;
  // Add other properties if present in your userInfo object
}


const UpdateLessons: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [sectionId, setSectionId] = useState<number>();

  const { id } = useParams();


  useEffect(() => {
    axios
      .get('http://localhost:2000/api/lesson/get/' + id)
      .then((res) => {
        // setCourseId(res.data.courceId);
        setSectionId(res.data.id)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
    
 
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!videoUrl) {
      console.error('Video file is required');
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append('videoUrl', videoUrl);
      uploadData.append('id', String(id));
      uploadData.append('sectionId', String(sectionId));
      uploadData.append('title', title);

      const response = await axios.put(`http://localhost:2000/api/lesson/update/${id}`, uploadData);
    
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

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSectionId = parseInt(e.target.value);
    setSectionId(selectedSectionId);
  };

  const handleContinue = () => {
    console.log('Continue button clicked');
    if (sectionId && id) {
      console.log('sectionId:', sectionId);
      console.log('id:', id);
    }
  };

  return (
    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4 p-4 rounded-md">
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
            className="w-0 "
            id="sectionId"
            value={sectionId}

            readOnly
          />
        </div>

        <div className="flex justify-between">
          <button className="bg-purple-500 hover:bg-white  shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-1 px-4 rounded" type="submit">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateLessons;