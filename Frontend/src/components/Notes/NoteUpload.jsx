import React, { useState } from "react";

const NoteUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert("Please choose a file first!");

    // Logic for uploading the file goes here (API call, etc.)
    alert("Note uploaded successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Upload Your Notes</h3>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleUpload}
        className="bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white py-2 px-4 rounded-lg"
      >
        Upload Note
      </button>
    </div>
  );
};

export default NoteUpload;
