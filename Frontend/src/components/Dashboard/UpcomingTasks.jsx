import React from 'react';

const UpcomingTasks = () => {
  return (
    <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Upcoming Study Tasks</h3>
      <ul className="mt-4 space-y-3">
        <li className="text-sm">Complete Flashcards Review - 5:00 PM</li>
        <li className="text-sm">Finish Biology Chapter 3 Notes - 8:00 PM</li>
        <li className="text-sm">Start History Flashcards - Tomorrow Morning</li>
      </ul>
    </div>
  );
};

export default UpcomingTasks;
