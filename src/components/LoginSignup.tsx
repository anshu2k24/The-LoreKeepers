import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./firebase"; // Adjust the path as needed
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const auth = getAuth(app);

const LoginSignup = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setError("");
      onLoginSuccess(); // Notify parent component of successful login
      navigate("/"); // Redirect to home page
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onLoginSuccess(); // Notify parent component of successful login
      navigate("/"); // Redirect to home page
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-neutral-900 mb-4">
        {isLogin ? "Welcome Back!" : "Create an Account"}
      </h2>
      <p className="text-neutral-600 mb-6">
        {isLogin ? "Sign in to continue." : "Join us to get started."}
      </p>

      <form onSubmit={handleEmailAuth} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="hello@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-neutral-200"></div>
        <span className="mx-4 text-neutral-500">or</span>
        <div className="flex-1 border-t border-neutral-200"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-6 py-3 rounded-lg transition-colors"
      >
        <FiLogIn className="text-lg" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-neutral-600 mt-4">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-orange-500 hover:underline"
        >
          {isLogin ? "Sign up instead" : "Sign in instead"}
        </button>
      </p>
    </div>
  );
};

export default LoginSignup;