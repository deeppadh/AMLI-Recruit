import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedCandidate: any;
  setSelectedCandidate: (candidate: any) => void;
  biasMode: boolean;
  setBiasMode: (mode: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [biasMode, setBiasMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedCandidate,
      setSelectedCandidate,
      biasMode,
      setBiasMode,
      chatOpen,
      setChatOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};