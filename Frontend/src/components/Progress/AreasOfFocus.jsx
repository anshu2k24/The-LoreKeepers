import React from 'react';

const AreasOfFocus = () => {
  return (
    <div className="bg-[#EEEEEE] p-6 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-[#4C1F7A] mb-4">Areas to Focus 🔍</h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <span className="text-xl text-[#FF8000] mr-3">📖</span>
          <span className="text-lg text-[#219B9D]">Try reviewing more flashcards on Math formulas! 🔢</span>
        </li>
        <li className="flex items-center">
          <span className="text-xl text-[#FF8000] mr-3">📝</span>
          <span className="text-lg text-[#219B9D]">Spend more time on History notes. You’ve been slacking there! ⏳</span>
        </li>
        <li className="flex items-center">
          <span className="text-xl text-[#FF8000] mr-3">💡</span>
          <span className="text-lg text-[#219B9D]">Review your notes from last week to reinforce your learning! 🔄</span>
        </li>
      </ul>
    </div>
  );
};

export default AreasOfFocus;
