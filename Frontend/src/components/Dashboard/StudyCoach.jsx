import React from 'react';

const StudyCoach = () => {
  return (
    <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Study Coach</h3>
      <p className="mt-4 text-sm">It’s time to review your notes. You haven’t studied in 3 days!</p>
      <button className="mt-4 bg-[#4C1F7A] text-white px-4 py-2 rounded-md hover:bg-[#219B9D] transition duration-300">
        Start Studying Now
      </button>
    </div>
  );
};

export default StudyCoach;
