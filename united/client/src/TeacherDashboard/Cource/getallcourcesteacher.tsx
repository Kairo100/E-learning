import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import './coall.css'
import { Dialog } from '@mui/material';
import CreateCoursePage from './CreateCource';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Add, Close } from '@mui/icons-material';
import { Spinner } from 'react-bootstrap';
interface Course {
  CategoryId: number;
  content: string;
  imageUrl: string;
  videoUrl: string;
  courceId: number;
  title: string;
  Section: {
    id: number;
    courceId: number;
    description: string;
    title: string;

    lessons: {
      id: number;
      title: string;
      content: null | string;
      videoUrl: string;
      sectionId: number;
      createdAt: string;
      updatedAt: string;
    }[];
  }[];
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
interface UserInfo {
  id: number;
}

const GetAllCoursesTeacher: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [shownewsection,setshownewsection]=useState(false)
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const userInfoString = localStorage.getItem('userInfo');
  const[show,setshow]=useState(false)
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
  const [isLoading,setisLoading]=useState(false)
  const Handleclose=()=>{
    setshownewsection(false)
  }
   const handlenewsection=()=>{
    setshownewsection(!shownewsection)
   }
  const handleSubmit = async (e:React.FormEvent) => {
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
       setisLoading(true)
      const response = await axios.post('http://localhost:2000/api/cource/upload', uploadData);
      toast.success('Registered successfully!');
       setshow(false)
       setisLoading(false)
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
        const response = await axios.get('http://localhost:2000/api/category/all');
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


  const handleclick=()=>{
    setshow(!show)
  }
  useEffect(() => {
    const fetchCourses = async () => {
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        try {
          const response = await axios.get<Course[]>(
            `http://localhost:2000/api/user/get/teachercource/${userInfo.id}`
          );
          setCourses(response.data);
          console.log(response.data);
        } catch (error) {
          console.log('Error fetching courses:', error);
        }
      }
    };
    fetchCourses();
  }, [userInfoString]);

  const handleSectionClick = (sectionId: number) => {
    if (selectedSection === sectionId) {
      setSelectedSection(null);
    } else {
      setSelectedSection(sectionId);
    }
  };

  const keys = [
    'Name',
    // 'Image',
    // 'Course Video',
    'Actions',
    'Section Name',
    'Action section',
  ];

  return (
    <div className="containerlistcource rounded-lg   m-4 bg-white">
      <div className='' style={{justifyContent:'space-between',display:'flex',marginRight:"17px"}}>
        {/* <p></p> */}
{/* <div className="flex justify-between"> */}
  <button></button>
<button  onClick={handleclick} className='hover:bg-blue-400 bg-blue-500  text-white py-1 px-2 rounded-md my-4'> New course</button>

{/* </div> */}
      </div>
    <div className="border rounded-lg">
      <table className="min-w-full p-8">
        <thead>
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                className="px-6 border py-3 text-left text-xs font-medium text-blue-500  tracking-wider "
                style={{fontSize:'20px',fontWeight:'bolder'}}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" border divide-y divide-gray-200">
          {courses.length > 0 ? (
            courses.map((course) => (
              <React.Fragment key={course.courceId}>
                <tr>
                  <td className="px-6 py-4">{course.title}</td>
      
                  <td className=' sm:block sm:mt-4'>
                    <Link to={`section/new/${course.courceId}`}>
                      <button  className="px-2 p-1 rounded ml-2 bg-blue-600 text-white">
                        New section
                      </button>
                    
                    </Link>
            
                      <button className="px-2 p-1 ml-2 bg-blue-600 rounded text-white">
                      <Link to={`detail/${course.courceId}`}>Lessons</Link>
                      </button>

                  </td>
                  <td className="px-6 border py-4">
                    {course.Section.map((section) => (
                      <div key={section.id}><td className='border mt-4 p-2'>{section.title}</td></div>
                    ))}
                  </td>
                  <td style={{display:'block'}} className="px-6  py-4">
                    {course.Section.map((section) => (
                      <div key={section.id} className='border' style={{display:'block'}}>
                        <Link to={`Lesson/new/${section.id}`}>
                          <button className="px-2 mt-2 py-1 bg-blue-400 rounded-md m-2 text-white ">
                            New Lesson
                          </button>
                        </Link>
                        <Link to={`update/${section.id}`}>
                          <button className="mt-2 px-2 py-1 bg-blue-400 rounded text-white mt-2">
                            update section
                          </button>
                        </Link>
                      </div>
                    ))}
                  </td>
                </tr>
           
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4" colSpan={keys.length}>
                No courses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <Dialog open={shownewsection} onClose={handlenewsection}>
    <div className="bg-gray-100 min-h-screen flex items-center ">
      <div>
     
      </div>
      <form className="bg-white shadow-md rounded px-8 py-6 w-96" onSubmit={handleSubmit}>
        <input
          style={{
            fontSize: '0px',
          }}
          readOnly
          type="text"
          className="hidden"
          // value={courseId}
        />
        <div className="">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title section:
          </label>
          <input
            required
            type="text"
            id="title"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </Dialog>
    <Dialog open={show} onClose={handleclick}>
    <div className="flex bg-black px-8 py-4 justify-between">
  <p className='text-white'>New cource</p>
        <p className='text-white' style={{cursor:'pointer'}} onClick={()=>setshow(false)}><Close/></p>
  </div>
    <div className="flex justify-center items-center bg-gray-100">
    <div className="w-[400px] w-md p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>

        <div className="">
          <div style={{ border: '1px dotted blue' }}>
          <label htmlFor="video" className="block mb-2 font-medium">
    Preview video
  </label>
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

        <div className="">
          <div style={{ border: '1px dotted blue' }}>
          <label htmlFor="video" className="block mb-2 font-medium">
    Image Preview
  </label>
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

        <div className="">
          <label htmlFor="title" className="block font-bold">
            Title
          </label>
          <input
            className="border border-gray-400 w-full rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="">
          <label htmlFor="price" className="block font-bold">
            Price
          </label>
          <input
            className="border border-gray-400 w-full rounded-md focus:outline-none focus:border-blue-500"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
          />
        </div>

        <div className="">
          <label htmlFor="categoryId" className="block font-bold">
            Category
          </label>
          <select
            className="border border-gray-400 p-4 w-full rounded-md focus:outline-none focus:border-blue-500"
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
        <div className="flex justify-between">
        <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            {isLoading ?<button className='animate-spin'><FaSpinner/></button>:<p>Add</p>}
          </button>
    
        </div>
      </form>
    </div>
    </div>
    </Dialog>
  </div>
  );
};

export default GetAllCoursesTeacher;