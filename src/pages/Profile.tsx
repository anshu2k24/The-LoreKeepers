// src/pages/Profile.tsx
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../components/firebase"; // Adjust the path as needed
import { FiUser, FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion"; // For animations

<<<<<<< HEAD
const auth = getAuth(app);

const Profile = ({ user }: { user: any }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-4xl font-bold text-neutral-900 mb-8">Profile</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-600">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <FiUser className="text-4xl text-white/80" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                {user.displayName || "Valued Member"}
              </h2>
              <p className="text-white/80">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-sm">
            <h3 className="font-semibold text-neutral-900 mb-2">✨ Welcome Back!</h3>
            <p className="text-sm text-neutral-600">
              You've completed <span className="font-bold">15 tasks</span> this week. Keep up the
              amazing work!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg transition-all hover:shadow-lg"
          >
            <FiLogOut className="text-lg" />
            Sign Out
          </motion.button>
        </div>
      </div>
    </motion.div>
=======
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, LogOut } from 'lucide-react';

const Profile = () => {
  // These will be connected to Firebase auth later
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleGoogleSignIn = async () => {
    // This will be implemented with Firebase
    console.log("Google sign-in clicked");
  };

  const handleSignOut = async () => {
    // This will be implemented with Firebase
    console.log("Sign-out clicked");
  };

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-neutral-900 mb-8">Profile</h1>

      <div className="card p-8">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">
                  {user?.displayName || "User"}
                </h2>
                <p className="text-neutral-600">{user?.email}</p>
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="p-4">
              <User className="w-16 h-16 mx-auto text-neutral-400" />
              <h2 className="text-xl font-semibold mt-4 mb-2">Welcome to StudyAI</h2>
              <p className="text-neutral-600 mb-6">
                Sign in to access your personalized study dashboard
              </p>
            </div>

            <Button
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200"
              onClick={handleGoogleSignIn}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
        )}
      </div>
    </div>
>>>>>>> af535d33c96a92e17fe0290f4083740327c2970b
  );
};

export default Profile;