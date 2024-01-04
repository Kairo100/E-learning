import React from 'react';

interface ChartProps {
  title: string;
  data: number[];
}

const Chart: React.FC<ChartProps> = ({ title, data }) => {
  return (
    <div className="chart">
      <h3>{title}</h3>
      <div className="chart-data">
        {data.map((value, index) => (
          <div className="chart-bar" key={index} style={{ height: `${value}%` }}></div>
        ))}
      </div>
    </div>
  );
};

export default Chart;