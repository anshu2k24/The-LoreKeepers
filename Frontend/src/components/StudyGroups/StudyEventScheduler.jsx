import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import to handle navigation

const StudyEventScheduler = () => {
  const [studyTime, setStudyTime] = useState('');
  const [studyDate, setStudyDate] = useState('');
  const navigate = useNavigate(); // For back navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Study Session Scheduled:", { studyTime, studyDate });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="text-[#4C1F7A] mb-4 flex items-center gap-2 hover:text-[#FF8000] transition duration-300">
        <span>&#8592;</span> Back
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-[#4C1F7A]">Schedule a Study Session</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
        {/* Date Input */}
        <div>
          <label className="text-lg font-semibold text-[#4C1F7A]" htmlFor="studyDate">Choose Date</label>
          <input
            type="date"
            id="studyDate"
            className="input input-bordered w-full pl-4 py-3 mt-2 rounded-md shadow-md focus:ring-2 focus:ring-[#4C1F7A]"
            value={studyDate}
            onChange={(e) => setStudyDate(e.target.value)}
            required
          />
        </div>

        {/* Time Input */}
        <div>
          <label className="text-lg font-semibold text-[#4C1F7A]" htmlFor="studyTime">Choose Time</label>
          <input
            type="time"
            id="studyTime"
            className="input input-bordered w-full pl-4 py-3 mt-2 rounded-md shadow-md focus:ring-2 focus:ring-[#4C1F7A]"
            value={studyTime}
            onChange={(e) => setStudyTime(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-3 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300">
          Schedule Session
        </button>
      </form>
    </div>
  );
};

export default StudyEventScheduler;
