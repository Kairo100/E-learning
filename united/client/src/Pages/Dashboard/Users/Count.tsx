import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  givenName: string;
  username: string;
  email: string;
  isPaid: boolean;
  password: string;
  joinedAt: string;
  updatedAt: string;
  isAdmin: boolean;
  IsDeleted: boolean;
}

const UserCount: React.FC = () => {
  const [dataCount, setDataCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ result: User[] }>('http://localhost:2000/api/user/get/all');
        const count = response.data.result.length;
        setDataCount(count);
      } catch (error) {
        console.error('Error counting data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {dataCount !== null ? (
        <p> {dataCount}</p>
      ) : (
        <p>Loading data count...</p>
      )}
    </div>
  );
};

export default UserCount;