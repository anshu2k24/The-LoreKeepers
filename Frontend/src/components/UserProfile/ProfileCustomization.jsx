import React, { useState } from 'react';

const ProfileCustomization = () => {
  const [avatar, setAvatar] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#4C1F7A]">Customize Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col items-center">
          <img
            src={avatar || 'https://www.gravatar.com/avatar?d=identicon'}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <input
            type="file"
            accept="image/*"
            className="py-2 px-4 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md cursor-pointer"
            onChange={handleFileChange}
          />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileCustomization;
