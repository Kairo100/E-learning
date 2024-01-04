import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Request {
  Requstpaymentid: number;
  Method: string;
  chanel: string;
  Description: string;
  Amount: number;
  courceId: number;
  AccountNumber: string;
  id: number;
  isDeleted: boolean;
  isAccepted: boolean;
}

const CountRequets: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [countIsAcceptedFalse, setCountIsAcceptedFalse] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Request[]>('http://localhost:2000/api/Request/get/all');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const count = requests.filter((request) => !request.isAccepted).length;
    setCountIsAcceptedFalse(count);
  }, [requests]);

  return (
    <div >

      {countIsAcceptedFalse}
      {/* Rest of your component code */}
    </div>
  );
};

export default CountRequets;