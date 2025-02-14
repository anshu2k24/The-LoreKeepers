import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import to handle navigation

const GroupChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { user: "Alice", message: "Hello everyone! Ready to study?" },
    { user: "Bob", message: "Let's get started!" },
  ]);

  const navigate = useNavigate(); // For back navigation

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: "You", message }]);
      setMessage('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate(-1)} 
        className="text-[#4C1F7A] mb-4 flex items-center gap-2 hover:text-[#FF8000] transition duration-300 cursor-pointer">
        <span>&#8592;</span> Back
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-[#000000]">Study Group Chat</h2>

      <div className="bg-gray-100 p-4 rounded-lg max-h-72 overflow-y-auto space-y-4 mb-4 border-slate-600 shadow-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`max-w-xs p-3 rounded-lg ${msg.user === "You" ? "bg-sky-200" : "bg-[#ffe3e3] text-black"}`}
            >
              <strong>{msg.user}:</strong> <span>{msg.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 ">
        <input
          type="text"
          className="input input-bordered w-full pl-4 py-3 rounded-md shadow-lg focus:ring-2 focus:ring-[#4C1F7A]  border-slate-900 bg-white"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="py-3 px-6 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300 cursor-pointer"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
