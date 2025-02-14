import React from 'react';

const FeaturesOverview = () => {
  return (
    <section className="py-16 bg-[#F8F8F8]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#4C1F7A] mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-[#4C1F7A] mb-4">AI Summaries</h3>
            <p className="text-lg text-gray-600">Summarize your study materials with AI for quick revision and understanding.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-[#4C1F7A] mb-4">Flashcard Generation</h3>
            <p className="text-lg text-gray-600">Generate flashcards from key points to optimize memorization using spaced repetition.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-[#4C1F7A] mb-4">Study Progress Tracking</h3>
            <p className="text-lg text-gray-600">Track your study history and improve your learning process over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;
