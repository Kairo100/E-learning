import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { getAllCategoryFn } from '../../../../redux/Slices/Dashboard/Category/GetAllCategories';

interface Category {
  id: number;
  name: string;
}

const Dropdown: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch=useDispatch<AppDispatch>()
  const getallctegory=useSelector((state:RootState)=>state.getAllCategory)

  useEffect(() => {
   dispatch(getAllCategoryFn())
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <select>
        Categories
      {/* {getallctegory.data.map((category) => (
        <option key={category.catId} defaultValue={'Categoris'}>
          {category.catName}
        </option>
      ))} */}
    </select>
  );
};

export default Dropdown;