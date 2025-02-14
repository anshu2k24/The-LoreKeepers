import React from "react";
import { Link } from "react-router-dom";

const NotePreview = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <h4 className="text-xl font-semibold">{title}</h4>
      <p className="text-gray-500">{description}</p>
      <Link
        to="/note-detail"
        className="text-[#4C1F7A] mt-4 inline-block font-medium hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default NotePreview;
