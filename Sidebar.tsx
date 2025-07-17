import React from 'react';
import { BarChart3, Users, Briefcase, UserCheck, Settings, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'onboarding', label: 'Onboarding', icon: UserCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="w-64 bg-navy-blue text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white mb-8">AMLI TalentEdge AI</h1>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-white ${
                    currentPage === item.id
                      ? 'bg-white text-navy-blue font-semibold'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;