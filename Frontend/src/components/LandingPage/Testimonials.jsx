import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-16 bg-[#F8F8F8]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#4C1F7A] mb-8">What Our Users Say</h2>
        <div className="flex justify-center space-x-8">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <p className="text-lg text-gray-600 mb-4">"StudyAI has revolutionized the way I study. It’s like having a personal tutor at my fingertips!"</p>
            <p className="font-semibold text-[#4C1F7A]">- John Doe, Student</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <p className="text-lg text-gray-600 mb-4">"With AI-enhanced notes, I’ve been able to study more effectively and improve my grades!"</p>
            <p className="font-semibold text-[#4C1F7A]">- Sarah Smith, Medical Student</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <p className="text-lg text-gray-600 mb-4">"I love the flashcard feature! It keeps me on track and helps me retain information better."</p>
            <p className="font-semibold text-[#4C1F7A]">- Mike Johnson, Engineer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
