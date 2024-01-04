import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface Category {
  catId: number;
  catName: string;
  Cource: Course[];
}

interface Course {
  courceId: number;
  title: string;
  price: string;
  Shortdescription: string;
  imageUrl: string;
  isPublished: boolean;
}

const CourcesandcategoryLink: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ result: Category[] }>(
          'http://localhost:2000/api/category/all'
        );
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
    if (filteredCourses.length > 0) {
      return (
        <div key={category.catId} className="">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">{category.catName}</h2>
          <TransitionGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course: Course) =>
              course.isPublished ? (
                <CSSTransition key={course.courceId} timeout={500} classNames="fade">
                  <Link to={`/cource/${course.courceId}`}>
                    <div className="bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden">
                      <div>
                        <img
                          className="w-full h-40 m-0 p-0 border object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-105"
                          src={course.imageUrl}
                          alt="Course"
                        />
                        <div className="p-4">
                          <h4 className="text-lg font-semibold mb-2">{course.title}</h4>
                          <p className="text-base">${course.price}</p>
                          {/* <p className="text-gray-400 mt-2">{course.Shortdescription}</p> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                </CSSTransition>
              ) : null
            )}
          </TransitionGroup>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container mt-32  mb-16 mx-auto">

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        categories.map((category: Category) => renderCourses(category))
      )}
    </div>
  );
};

export default CourcesandcategoryLink;