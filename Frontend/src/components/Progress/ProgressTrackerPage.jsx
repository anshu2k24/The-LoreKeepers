import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressTrackerPage = () => {
  // Sample data for the chart (replace with dynamic data as per your requirements)
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Months
    datasets: [
      {
        label: 'Study Hours',
        data: [4, 6, 8, 5, 9, 7, 10], // Data for study hours (adjust based on your data)
        fill: false,
        borderColor: '#219B9D',
        tension: 0.1,
      },
      {
        label: 'Flashcards Reviewed',
        data: [10, 20, 25, 18, 30, 22, 35], // Data for flashcards reviewed (adjust based on your data)
        fill: false,
        borderColor: '#FF8000',
        tension: 0.1,
      },
    ],
  };

  // Options for the chart (you can adjust styles, axis labels, etc.)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Study Progress Over Time',
        font: {
          size: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw} hours`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Study Hours / Flashcards',
        },
      },
    },
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold text-center text-[#4C1F7A] mb-6">Your Study Progress</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ProgressTrackerPage;
