import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryCount = () => {
  const [CategoryCount, setCategoryCount] = useState<number>(0);

  useEffect(() => {
    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/category/all');
        const count = response.data.result.length; // Assuming the response contains a "result" array with users
        setCategoryCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchCategoryCount();
  }, []);

  return <div>{CategoryCount}</div>;
};

export default CategoryCount;