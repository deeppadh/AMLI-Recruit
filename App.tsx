import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import JobPostings from './components/JobPostings';
import CandidateListing from './components/CandidateListing';
import CandidateProfile from './components/CandidateProfile';
import OnboardingDashboard from './components/OnboardingDashboard';
import Settings from './components/Settings';
import ChatBot from './components/ChatBot';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobPostings />;
      case 'candidates':
        return <CandidateListing />;
      case 'candidate-profile':
        return <CandidateProfile />;
      case 'onboarding':
        return <OnboardingDashboard />;
      case 'analytics':
        return <Dashboard />; // Reusing dashboard for demo
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-8">
          {renderCurrentPage()}
        </main>
      </div>
      <ChatBot />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;