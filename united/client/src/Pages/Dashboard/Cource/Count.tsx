import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourceCount = () => {
  const [CourceCount, setCourceCount] = useState<number>(0);

  useEffect(() => {
    const fetchCourceCount = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/cource/get/all');
        // console.log(response)
        const count = response.data.result.length; // Assuming the response contains a "result" array with users
        setCourceCount(count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchCourceCount();
  }, []);

  return <div>{CourceCount}</div>;
};

export default CourceCount;