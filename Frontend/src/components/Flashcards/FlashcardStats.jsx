import React from "react";

const FlashcardStats = () => {
  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">Flashcard Stats</h3>
      <ul className="space-y-2">
        <li>Cards Reviewed: 15</li>
        <li>Correct Answers: 12</li>
        <li>Review Streak: 7 Days</li>
      </ul>
    </div>
  );
};

export default FlashcardStats;
