import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-[#4C1F7A] mb-12">How StudyAI Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-[#ffffff] border p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-[#4C1F7A] mb-4">Step 1: Upload</h3>
            <p className="text-lg text-gray-600">Upload any study material – PDFs, Docs, Images, etc.</p>
          </div>
          <div className="bg-[#ffffff] border p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-[#4C1F7A] mb-4">Step 2: AI Process</h3>
            <p className="text-lg text-gray-600">Let AI process and enhance your notes, creating summaries, flashcards, and more.</p>
          </div>
          <div className="bg-[#ffffff] border p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-[#4C1F7A] mb-4">Step 3: Study</h3>
            <p className="text-lg text-gray-600">Use your AI-enhanced materials to study efficiently and track your progress.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
