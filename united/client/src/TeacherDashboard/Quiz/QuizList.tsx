import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
// import './coall.css'
import { Dialog } from '@mui/material';
import CreateCoursePage from './CreateCource';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const QuizList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const userInfoString = localStorage.getItem('userInfo');
  const[show,setshow]=useState(false)

  const [id, setId] = useState<number | null>(null);


  

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





  const handleclick=()=>{
    setshow(!show)
  }
  useEffect(() => {
    const fetchCourses = async () => {
      if (userInfoString) {
        const userInfo: UserInfo = JSON.parse(userInfoString);
        try {
          const response = await axios.get<Course[]>(
            `http://localhost:5000/api/user/get/teachercource/${userInfo.id}`
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


  const keys = [
    'Cource Title',
    'Cource Image',
    'Cource Video',
    'Action Cource',
    'Section Title',
    'Actions of Section',
  ];

  return (
    <div className="containerlistcource border m-4 bg-white">
      <div className='' style={{justifyContent:'space-between',display:'flex',marginRight:"17px"}}>
        <p></p>
        <button className='add ' onClick={handleclick}>Add</button>
      </div>
    <div className="bg-white  rounded ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white d">
          {courses.length > 0 ? (
            courses.map((course) => (
              <React.Fragment key={course.courceId}>
                <tr className=''>
                  <td className="border">{course.title}</td>
                  <td className="sm:w-1/12 border">
                    <img
                      src={course.imageUrl}
                      alt="Course Image"
                     style={{maxWidth:"60px",maxHeight:"60px",minHeight:"60px",minWidth:"60px"}}
                    />
                  </td>
                  <td className='border'>
                    <Link to={`new/${course.courceId}`}>
                      <button  className="px-2 p-1 rounded ml-2 bg-purple-400 text-white">
                        Add quiz
                      </button>
                    
                    </Link>
            
                      <button className="px-2 p-1 ml-2 bg-purple-400 rounded text-white">
                      <Link to={`detail/${course.courceId}`}>Detail</Link>
                      </button>

                  </td>
                  <td className="border mt-4 p-2">
                    {course.Section.map((section) => (
                      <div key={section.id}><td className='border mt-4'>{section.title}</td></div>
                    ))}
                  </td>
                  <td style={{display:'block'}} className="px-6 border  py-4">
                    {course.Section.map((section) => (
                      <div key={section.id} className='' style={{display:'block'}}>
                        <Link to={`Lesson/new/${section.id}`}>
                          <button className="px-2 mt-2 py-1 bg-purple-400 rounded-md m-2 text-white ">
                            Add question
                          </button>
                        </Link>
                        <Link to={`update/${section.id}`}>
                          <button className="mt-2 px-2 py-1 bg-purple-400 rounded text-white mt-2">
                            Update quiz
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
              <td className="" colSpan={keys.length}>
                No courses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  </div>
  );
};

export default QuizList;