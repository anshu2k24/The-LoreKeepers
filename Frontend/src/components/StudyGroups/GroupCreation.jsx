import React, { useState } from 'react';
import { FaUser, FaList, FaTag } from 'react-icons/fa'; // Import icons for better visual appeal
import { useNavigate } from 'react-router-dom'; // Import to handle navigation

const GroupCreation = () => {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [topics, setTopics] = useState('');
  const navigate = useNavigate(); // For back navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle group creation logic (submit form)
    console.log("Group Created:", { groupName, description, topics });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="text-[#4C1F7A] mb-4 flex items-center gap-2 hover:text-[#FF8000] transition duration-300">
        <span>&#8592;</span> Back
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-[#4C1F7A]">Create a New Study Group</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
        
        {/* Group Name Input */}
        <div className="relative">
          <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#4C1F7A]" />
          <input
            type="text"
            placeholder="Group Name"
            className="input input-bordered w-full pl-12 py-3 rounded-md shadow-md"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        {/* Description Text area */}
        <div className="relative">
          <FaList className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#4C1F7A]" />
          <textarea
            placeholder="Group Description"
            className="input input-bordered w-full pl-12 py-3 rounded-md shadow-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Topics Input */}
        <div className="relative">
          <FaTag className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#4C1F7A]" />
          <input
            type="text"
            placeholder="Study Topics"
            className="input input-bordered w-full pl-12 py-3 rounded-md shadow-md"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-3 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300">
          Create Group
        </button>
      </form>
    </div>
  );
};

export default GroupCreation;
