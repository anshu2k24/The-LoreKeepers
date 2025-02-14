import React from "react";
import NoteSearch from "./NoteSearch";
import NoteUpload from "./NoteUpload";
import NotePreview from "./NotePreview";

const NotesPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Your Notes</h2>

      <div className="mb-6">
        <NoteSearch />
      </div>

      <div className="mb-6">
        <NoteUpload />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Example Notes */}
        <NotePreview title="Math Notes" description="Algebra and Calculus notes" />
        <NotePreview title="History Notes" description="Ancient Civilizations" />
        <NotePreview title="Science Notes" description="Physics and Chemistry notes" />
      </div>
    </div>
  );
};

export default NotesPage;
