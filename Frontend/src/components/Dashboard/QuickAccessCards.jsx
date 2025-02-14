import React from 'react';

const QuickAccessCards = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
        <h3 className="font-semibold text-xl">Recent Notes</h3>
        <p className="text-sm">Review your latest study notes.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
        <h3 className="font-semibold text-xl">Flashcards to Review</h3>
        <p className="text-sm">Review your flashcards based on recent activity.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
        <h3 className="font-semibold text-xl">Your Progress</h3>
        <p className="text-sm">Track your study progress.</p>
      </div>
    </div>
  );
};

export default QuickAccessCards;
