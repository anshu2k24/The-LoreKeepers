import React from 'react';
import { Link } from 'react-router-dom';

const CollaborativeStudyGroupsPage = () => {
  const groups = [
    { name: "Biology Study Group", description: "Prepare for your biology exams with peers!", id: 1 },
    { name: "Math Study Group", description: "Solve problems and master math concepts together.", id: 2 },
    { name: "History Study Group", description: "Discuss historical events and get ready for the test.", id: 3 }
  ];

  return (
    <div className="p-6 bg-[#EEEEEE]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-black">Collaborative Study Groups</h2>
        <div className="flex space-x-4">
          <Link 
            to="/group-create" 
            className="py-2 px-4 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300"
          >
            Create a Group
          </Link>
          <Link 
            to="/group-chat" 
            className="py-2 px-4 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300"
          >
            Group Chat
          </Link>
          <Link 
            to="/study-event-scheduler" 
            className="py-2 px-4 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300"
          >
            Study Event Scheduler
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <div key={group.id} className="card bg-white shadow-xl p-4 rounded-lg flex flex-col items-center hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold text-black">{group.name}</h3>
            <p className="text-center mt-2 text-gray-700">{group.description}</p>
            <Link 
              to={`/group/${group.id}`} 
              className="mt-4 py-2 px-4 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white rounded-md hover:bg-[#FF8000] transition duration-300"
            >
              Join Group
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborativeStudyGroupsPage;
