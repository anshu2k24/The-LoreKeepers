import React from 'react';

const DashboardHeader = ({ userName }) => {
  return (
    <div className="bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white p-6 shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold">Welcome back, {userName}!</h2>
      <p className="text-lg">Let’s continue your study journey!</p>
    </div>
  );
};

export default DashboardHeader;
