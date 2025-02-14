import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white py-20">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl font-extrabold mb-6 text-white tracking-wide leading-tight animate__animated animate__fadeIn">
          Transform Your Learning with AI
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-90 animate__animated animate__fadeIn animate__delay-1s">
          Effortlessly organize your study material, enhance your notes, and improve your learning with StudyAI.
        </p>
        <Link
          to="/signup"
          className="bg-[#FF8000] text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-[#FF6347] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:ring-opacity-50 animate__animated animate__fadeIn animate__delay-2s"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
