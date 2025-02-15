import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HeroSection from "./components/LandingPage/HeroSection";
import FeaturesOverview from "./components/LandingPage/FeaturesOverview";
import HowItWorks from "./components/LandingPage/HowItWorks";
import Testimonials from "./components/LandingPage/Testimonials";
import Footer from "./components/LandingPage/Footer";
import Login from "./components/Auth/Login"; // Updated to use the new Login component
import Register from "./components/Auth/Register"; // Replaced SignUp with Register
import NotesPage from "./components/Notes/NotesPage";
import NoteDetailPage from "./components/Notes/NoteDetailPage";
import Dashboard from "./components/Dashboard/Dashboard";
import FlashcardsPage from "./components/Flashcards/FlashcardsPage";
import CollaborativeStudyGroupsPage from "./components/StudyGroups/CollaborativeStudyGroupsPage";
import GroupCreation from "./components/StudyGroups/GroupCreation";
import Chat from "./components/StudyGroups/Chat"; // Replaced GroupChat with Chat
import StudyEventScheduler from "./components/StudyGroups/StudyEventScheduler";
import GroupDetailPage from "./components/StudyGroups/GroupDetailPage";
import UserProfilePage from "./components/UserProfile/UserProfilePage";
import SettingsPage from "./components/UserProfile/SettingsPage";
import ProfileCustomization from "./components/UserProfile/ProfileCustomization";
import NotificationSettings from "./components/UserProfile/NotificationSettings";
import ProgressTrackerPage from "./components/Progress/ProgressTrackerPage";
import GraphsAndCharts from "./components/Progress/GraphsAndCharts";
import AreasOfFocus from "./components/Progress/AreasOfFocus";
import { AuthProvider } from "./contexts/authContext"; // Added AuthProvider
import Home from "./components/home/index";

function App() {
  return (
    <AuthProvider> {/* Wrapped the entire app with AuthProvider */}
      <Router>
        <div className="flex flex-col min-h-screen bg-[#EEEEEE]">
          <header className="bg-gradient-to-r from-[#4C1F7A] to-[#219B9D] text-white py-6 px-8 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-4xl font-bold tracking-wider">StudyAI</h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link
                      to="/"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/notes-page"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Notes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/flashcards-page"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Flashcards
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/study-groups"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Study Groups
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/progress"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Progress
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user-profile"
                      className="text-lg font-medium hover:text-[#FF8000] transition duration-300 ease-in-out"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeaturesOverview />
                    <HowItWorks />
                    <Testimonials />
                  </>
                }
              />
              <Route path="/home" element={<Home />} />
              <Route path="/features" element={<FeaturesOverview />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/login" element={<Login />} /> {/* Updated Login route */}
              <Route path="/register" element={<Register />} /> {/* Replaced SignUp with Register */}
              <Route path="/notes-page" element={<NotesPage />} />
              <Route path="/note-detail" element={<NoteDetailPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/flashcards-page" element={<FlashcardsPage />} />
              <Route path="/study-groups" element={<CollaborativeStudyGroupsPage />} />
              <Route path="/group-create" element={<GroupCreation />} />
              <Route path="/group-chat" element={<Chat/>} /> {/* Replaced GroupChat with Chat */}
              <Route path="/study-event-scheduler" element={<StudyEventScheduler />} />
              <Route path="/group/:id" element={<GroupDetailPage />} />
              <Route path="/user-profile" element={<UserProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile-customization" element={<ProfileCustomization />} />
              <Route path="/notification-settings" element={<NotificationSettings />} />
              <Route path="/progress" element={<ProgressTrackerPage />} />
              <Route path="/graphs-and-charts" element={<GraphsAndCharts />} />
              <Route path="/areas-of-focus" element={<AreasOfFocus />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;