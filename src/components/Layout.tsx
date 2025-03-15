
import React from 'react';
import { GraduationCap, Book, User, Brain, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { icon: Book, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Notes', path: '/notes' },
    { icon: Brain, label: 'Study', path: '/study' },
    { icon: GraduationCap, label: 'Progress', path: '/progress' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-neutral-200 z-50">
        <div className="layout-container h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold text-neutral-900">StudyAI</span>
          </div>
          
          <div className="flex items-center gap-6">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={`nav-link flex items-center gap-2 py-2 ${
                  location.pathname === path ? 'text-primary' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="layout-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
