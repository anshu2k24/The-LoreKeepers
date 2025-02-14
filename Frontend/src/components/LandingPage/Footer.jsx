import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#4C1F7A] text-white py-8">
      <div className="container mx-auto text-center px-4">
        <p className="text-lg mb-6">© 2025 StudyAI. All rights reserved. 🌟</p>
        <div className="flex justify-center space-x-6 text-lg">
          <Link 
            to="/about" 
            className="hover:text-[#FF8000] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:ring-opacity-50"
          >
            About
          </Link>
          <Link 
            to="/privacy-policy" 
            className="hover:text-[#FF8000] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:ring-opacity-50"
          >
            Privacy Policy
          </Link>
          <Link 
            to="/terms-of-service" 
            className="hover:text-[#FF8000] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:ring-opacity-50"
          >
            Terms of Service
          </Link>
          <Link 
            to="/faq" 
            className="hover:text-[#FF8000] transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF8000] focus:ring-opacity-50"
          >
            FAQ
          </Link>
        </div>
        <div className="mt-6">
          <p className="text-sm opacity-70">Made with ❤️ by the StudyAI Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
