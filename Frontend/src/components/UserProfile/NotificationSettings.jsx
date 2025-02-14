import React, { useState } from 'react';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#4C1F7A]">Notification Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="checkbox"
          />
          <p className="text-lg text-black">Email Notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={pushNotifications}
            onChange={() => setPushNotifications(!pushNotifications)}
            className="checkbox"
          />
          <p className="text-lg text-black">Push Notifications</p>
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
