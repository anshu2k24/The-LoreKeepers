import React from 'react';
import { useParams, Link } from 'react-router-dom';

const GroupDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="mb-4">
        <Link 
          to="/study-groups" 
          className="py-2 px-4 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300"
        >
          Back to Study Groups
        </Link>
      </div>
      <h2 className="text-3xl font-bold">Group Detail for ID: {id}</h2>
      <p>Here you can display the details of the selected study group!</p>

    </div>
  );
};

export default GroupDetailPage;
