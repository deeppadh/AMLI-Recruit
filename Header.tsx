import React from 'react';
import { Search, Bell, Mic, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { setChatOpen } = useApp();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search candidates, jobs, or documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-96 focus:ring-2 focus:ring-navy-blue focus:border-transparent"
              aria-label="Search platform"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            className="p-2 text-gray-600 hover:text-navy-blue transition-colors rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-navy-blue"
            aria-label="Voice commands"
          >
            <Mic size={20} />
          </button>
          
          <button
            className="p-2 text-gray-600 hover:text-navy-blue transition-colors rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-navy-blue relative"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-accent-burgundy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          
          <div className="h-8 w-px bg-gray-300"></div>
          
          <div className="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2"
              alt="User profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <div className="font-semibold text-gray-800">Alex Johnson</div>
              <div className="text-gray-600">HR Manager</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-navy-blue text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-navy-blue z-50"
        aria-label="Open AI chat support"
      >
        <MessageCircle size={24} />
      </button>
    </header>
  );
};

export default Header;