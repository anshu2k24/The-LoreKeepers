import React from "react";

const NoteSearch = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search your notes..."
        className="w-full p-3 border border-gray-300 rounded-lg"
      />
      <button
        className="ml-4 bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white py-3 px-6 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default NoteSearch;
