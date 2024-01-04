import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Chartyear.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ChartYear = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await axios.get(`http://localhost:5000/api/user/get/year/${year}`);
        setChartData(response.data);
      } catch (error) {
        console.error('Failed to fetch chart data', error);
      }
    };

    fetchChartData();
  }, []);

  return (
<div className="chartyears">
<div className="continerchart w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
</div>
  );
};

export default ChartYear;