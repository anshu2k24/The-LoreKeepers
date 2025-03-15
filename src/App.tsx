import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./components/firebase"; // Adjust the path as needed
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Notes from "./pages/Notes";
import Study from "./pages/Study";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import NotFound from  "./pages/NotFound";
import LoginSignup from "./components/LoginSignup"; // Add the LoginSignup component

const queryClient = new QueryClient();
const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check auth state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Protect the Profile route
  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (loading) {
      return <div className="text-center p-8">Loading...</div>; // Show loading state
    }
    return user ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/study" element={<Study />} />
              <Route path="/progress" element={<Progress />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginSignup onLoginSuccess={() => setUser(auth.currentUser)} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;