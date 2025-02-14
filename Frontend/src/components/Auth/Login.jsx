import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form (This could be API call for actual authentication)
    console.log('Login submitted!');
  };

  return (
    <section className="bg-[#F8F8F8] min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-[#4C1F7A] text-center mb-8">Login to Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8000]"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#FF8000] text-white py-3 rounded-lg text-lg hover:bg-[#FF6347] transition duration-300"
          >
            Login
          </button>

          {/* Other Login Options */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">or login with</span>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-full">
                Google
              </button>
              <button className="bg-blue-800 text-white py-2 px-4 rounded-full">
                Facebook
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Forgot your password?{' '}
              <Link to="/reset-password" className="text-[#FF8000] hover:text-[#FF6347]">Reset it here</Link>
            </p>
          </div>

          {/* Create Account Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#FF8000] hover:text-[#FF6347]">Sign up here</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
