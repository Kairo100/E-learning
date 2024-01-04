import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Courcelist.css';
import { LocationCity } from '@mui/icons-material';

interface Category {
  catId: number;
  catName: string;
  Cource: Course[];
}

interface Course {
  courceId: number;
  title: string;
  price: string;
  Shortdescription:string;
  imageUrl: string;
  isPublished: boolean;
}

const AllCources: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ result: Category[] }>('http://localhost:2000/api/category/all');
        setCategories(response.data.result);
      } catch (error) {
        // Handle error
      }
    };

    fetchCategories();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const renderCourses = (category: Category) => {
    // Filter the courses based on the search query
    const filteredCourses = category.Cource.filter((course: Course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Render the category only if there are matching courses
    if (filteredCourses.length >0) {
      return (
        <div key={category.catId} className=" mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category.catName}</h2>
          <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course: Course) =>
              course.isPublished ? (
                <div key={course.courceId}>
                  <Link to={`cource/${course.courceId}`}>
                    <div className="items-center border border:1-gray-400 rounded">
                      <div>
                        <img
                          className="w-full ml-[-0px] border h-40 object-cover rounded-md mb-4"
                          src={course.imageUrl}
                          alt="Course"
                          
                        />
                        <h4 className="text-lg font-semibold mb-2 p-2">{course.title}</h4>
                        <p className="text-base p-2">${course.price}</p>
                        <p className='text-gray-400 p-2' style={{textTransform:'capitalize'}}>{course.Shortdescription}</p>
                        <p className='text-gray-400 p-2' style={{textTransform:'capitalize'}}>SeAsom college</p>
                        {/* Render other course details */}
                        
                      </div>
                    </div>
                  </Link>
                </div>
              ) : null
            )}
          </TransitionGroup>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container-fluid  bg-white cours">
      <div className="container mx-auto px-4 py-8">
        <div  className="mb-8 input-search">
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            
            placeholder="Search courses .."
            value={searchQuery}
            onChange={handleSearchInputChange}
            style={{ borderRadius: '22px',border:'2px solid blueviolet',background:'white' }}
          />
          {/* <button>Search</button> */}
        </div>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories.map((category: Category) => renderCourses(category))
        )}
      </div>
    </div>
  );
};

export default AllCources;