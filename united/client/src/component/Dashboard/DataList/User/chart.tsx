import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

interface ChartData {
  givenName: string;
  count: number;
}

const Chartuser = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/chart');
      const data: ChartData[] = response.data;

      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const chartLabels = chartData.map((data) => data.givenName);
  const chartValues = chartData.map((data) => data.count);

  const chartConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Review Count',
        data: chartValues,
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>User Review Count Chart</h2>
      <Bar data={chartConfig} />
    </div>
  );
};

export default Chartuser;