import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface UserInfo {
  id: number;
  // Add other properties if present in your userInfo object
}

interface Category {
  catId: number;
  catName: string;
  catDescription: string | null;
  catImage: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

const CreateCoursePage: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [Shortdescription, setShortdescription] = useState('');
  const [courceId, setCourseId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!videoUrl || !imageUrl) {
      toast.info('Registering...', { autoClose: false });
    }

    try {
      const uploadData = new FormData();
      uploadData.append('videoUrl', videoUrl);
      uploadData.append('imageUrl', imageUrl);
      uploadData.append('price', String(price));
      uploadData.append('id', String(id));
      uploadData.append('CategoryId', String(categoryId));
      uploadData.append('Shortdescription', Shortdescription);
      uploadData.append('content', content);
      uploadData.append('title', title);

      const response = await axios.post('http://localhost:5000/api/cource/upload', uploadData);
      toast.success('Registered successfully!');
      setCourseId(response.data.courceId)
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.error('Failed to upload video or image', error);
      // Handle the error or display an error message
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedVideo = e.target.files[0];
      setVideoUrl(selectedVideo);
      setVideoPreview(URL.createObjectURL(selectedVideo));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedImage = e.target.files[0];
      setImageUrl(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  useEffect(() => {
    // Retrieve 'id' from localStorage or userInfo and set it in the state
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
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category/all');
        if (response.data.isSuccess) {
          setCategories(response.data.result);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(e.target.value);
    setCategoryId(selectedCategoryId);
  };



  return (
    <div className="flex justify-center items-center bg-gray-100">
    <div className="w-[400px] w-md p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div style={{ border: '1px dotted blue' }}>
            <input
              className="bg-white"
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange
              }
            />
            {videoPreview && (
              <video width="320" height="240" controls>
                <source src={videoPreview} type="video/mp4" />
              </video>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div style={{ border: '1px dotted blue' }}>
            <input
              className="bg-white"
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" width="320" />}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="block font-bold">
            Title
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block font-bold">
            Price
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block font-bold">
            Category
          </label>
          <select
            className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            id="categoryId"
            value={categoryId || ''}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.catId} value={category.catId}>
                {category.catName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="Shortdescription" className="block font-bold">
            Short Description
          </label>
          <textarea
            className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
            id="Shortdescription"
            value={Shortdescription}
            onChange={(e) => setShortdescription(e.target.value)}
            required
          />
        </div>

   

        <div className="mb-4">
          <label htmlFor="content" className="block font-bold">
            what will you learn ?
          </label>
          <ReactQuill
          className="border border-gray-400 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
          id="content"
          value={content}
          onChange={(value) => setContent(value)}
          // required
        />
        </div>

        <div className="flex justify-between">
        <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
    
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateCoursePage;