import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

const SettingsPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#4C1F7A]">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex items-center space-x-4">
          <FaCog className="text-xl text-[#4C1F7A]" />
          <p className="text-lg text-black">App Settings</p>
        </div>
        <div className="flex items-center space-x-4">
          <input type="checkbox" className="checkbox" />
          <p className="text-lg text-black">Enable Notifications</p>
        </div>
        <Link
          to="/notification-settings"
          className="py-2 px-6 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300"
        >
          Notification Settings
        </Link>
      </div>
    </div>
  );
};

export default SettingsPage;
