import React from 'react';
import { useNavigate } from 'react-router-dom';

function NoteDetailPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/notes-page');  // Navigates back to the Notes page
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back Button to go back to Notes */}
      <button
        onClick={handleBack}
        className="bg-[#4C1F7A] text-white py-2 px-4 rounded mb-4 hover:bg-[#FF8000] transition duration-300 ease-in-out"
      >
        Back to Notes
      </button>

      {/* Note Details Content */}
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold">Note Detail</h2>
        {/* Display the detailed note content here */}
        <p>Detailed content of the note...</p>
      </div>
    </div>
  );
}

export default NoteDetailPage;
