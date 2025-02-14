import React from 'react';
import DashboardHeader from './DashboardHeader';
import QuickAccessCards from './QuickAccessCards';
import AIRecommendations from './AIRecommendations';
import UpcomingTasks from './UpcomingTasks';
import StudyCoach from './StudyCoach';
// import PersonalizedGreeting from './PersonalizedGreeting';

const Dashboard = () => {
  const userName = "John Doe"; // This should be dynamically fetched based on the logged-in user.

  return (
    <div className="container mx-auto p-8">
      <DashboardHeader userName={userName} />
      {/* <PersonalizedGreeting userName={userName} /> */}
      <QuickAccessCards />
      <AIRecommendations />
      <UpcomingTasks />
      <StudyCoach />
    </div>
  );
};

export default Dashboard;
