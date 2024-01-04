import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Course {
  courceId: number;
  Name: string | null;
  Shortdescription: string;
  content: string;
  title: string;
  price: string;
  imageUrl: string;
  isDeleted: boolean;
  videoUrl: string;
  id: number;
  isPublished: boolean;
  createdAt: string;
  UpadatedAt: string;
  CategoryId: number;
}

interface Category {
  catId: number;
  catName: string;
  catDescription: string;
  catImage: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  Cource: Course[];
}

const CourceList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/category/all');
        setCategories(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  useEffect(() => {
    if (categories.length > 0) {
      const firstCategoryWithCourses = categories.find(
        (category) => category.Cource.length > 0
      );
      setSelectedCategory(firstCategoryWithCourses || null);
    }
  }, [categories]);

  const filteredCourses = selectedCategory?.Cource.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white  min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Sidebar */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <div
                key={category.catId}
                className={`p-2 cursor-pointer ${
                  selectedCategory?.catId === category.catId ? 'bg-blue-600 text-white rounded' : 'bg-gray-200 rounded text-gray-700'
                } transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.catName}
              </div>
            ))}
          </div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search anything ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-full md:w-auto"
          />
        </div>
        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCourses?.filter((course) => course.isPublished).map((course) => (
              <Link to={`/cource/${course.courceId}`} key={course.courceId}>
                <div className=" text-enter border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-95">
                  <img src={course.imageUrl} alt={course.title} className="w-[700px] border m-0 p-0 h-40 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-bold m-4">{course.title}</h3>
                  {/* <p className="text-sm text-gray-600 mt-2">{course.Shortdescription}</p> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourceList;