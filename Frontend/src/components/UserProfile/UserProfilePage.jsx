import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const UserProfilePage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#4C1F7A]">User Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
        <FaUserCircle className="text-6xl text-[#4C1F7A]" />
        <div className="space-y-2">
          <p className="text-lg text-black">Name: John Doe</p>
          <p className="text-lg text-black">Email: john@example.com</p>
        </div>
        <Link
          to="/profile-customization"
          className="py-2 px-6 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
