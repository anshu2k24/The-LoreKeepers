import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const GraphsAndCharts = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Study Hours (this week)',
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: '#FF8000',
        backgroundColor: '#FF8000',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Study Hours Progress',
        font: { size: 20 },
        color: '#4C1F7A',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
      <Line data={data} options={options} />
    </div>
  );
};

export default GraphsAndCharts;
