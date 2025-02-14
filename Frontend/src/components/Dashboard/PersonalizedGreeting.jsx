import React from 'react';

const PersonalizedGreeting = ({ userName }) => {
  return (
    <div className="bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white p-6 rounded-md shadow-lg mt-6">
      <h2 className="text-2xl font-semibold">Welcome back, {userName}!</h2>
      <p className="text-lg">We’ve got some study sessions to catch up on!</p>
    </div>
  );
};

export default PersonalizedGreeting;
