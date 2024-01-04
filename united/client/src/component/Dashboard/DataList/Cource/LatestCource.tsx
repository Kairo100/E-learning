import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowRightAltOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const LatestCourses: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const fetchLatestCourses = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/cource/get/letest');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching latest courses:', error);
      }
    };

    fetchLatestCourses();
  }, []);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/category/all');
        setAllCourses(response.data.result);
      } catch (error) {
        console.error('Error fetching all courses:', error);
      }
    };

    if (showAllCourses) {
      fetchAllCourses();
    }
  }, [showAllCourses]);

  const handleBrowseAll = () => {
    setShowAllCourses(true);
  };

  const handleCategoryClick = async (categoryId:any) => {
    try {
      const response = await axios.get(`http://localhost:2000/api/cource/category/${categoryId}`);
      setCourses(response.data);
      setShowAllCourses(false);
    } catch (error) {
      console.error('Error fetching category courses:', error);
    }
  };

  return (
    <div className="flex-col items-center">
      <div className="flex justify-between sm:mx-[40px] md:mx-[100px] mt-8">
        <h1 className="text-3xl font-bold flex mb-6">New Courses</h1>
        {!showAllCourses && (
          <button
            className="border border-blue-600 hover:text-white hover:bg-blue-600 rounded-md px-4 py-2 mb-6 flex items-center"
            onClick={handleBrowseAll}
          >
            Browse All <ArrowRightAltOutlined className="ml-2" />
          </button>
        )}
      </div>
      <div className="grid md:mx-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showAllCourses
          ? allCourses.map((category: any) =>
              category.Cource.map((course: any) => (
                <div
                  key={course.courceId}
                  className="bg-white shadow w-[90%] ml-2 rounded-md hover:shadow-md overflow-hidden"
                >
                  <Link to={`cource/${course.courceId}`}>
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                      <p className="text-gray-600 mb-2">${course.price}</p>
                    </div>
                  </Link>
                </div>
              ))
            )
          : courses.map((course: any) => (
              <div
                key={course.courceId}
                className="bg-white shadow w-[90%] ml-2 rounded-md hover:shadow-md overflow-hidden"
              >
                <Link to={`cource/${course.courceId}`}>
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-2">${course.price}</p>
                  </div>
                </Link>
              </div>
            ))}
      </div>
      {/* {showAllCourses && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="flex gap-4">
            {allCourses.map((category: any) => (
              <button
                key={category.categoryId}
                className="border border-blue-600 hover:text-white hover:bg-blue-600 rounded-md text-blue-600 px-4 py-2"
                onClick={() => handleCategoryClick(category.categoryId)}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default LatestCourses;