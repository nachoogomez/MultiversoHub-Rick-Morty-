import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useFavourites } from './FavouritesContext';

interface StatsContextType {
  totalCharacters: number;
  setTotalCharacters: (count: number) => void;
  incrementCharacters: () => void;
  resetStats: () => void;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

interface StatsProviderProps {
  children: ReactNode;
}

export function StatsProvider({ children }: StatsProviderProps) {
  const [totalCharacters, setTotalCharacters] = useState(0);
  const { favourites } = useFavourites();

  const incrementCharacters = () => {
    setTotalCharacters(prev => prev + 20); // Cada página carga 20 personajes
  };

  const resetStats = () => {
    setTotalCharacters(0);
  };

  const value: StatsContextType = {
    totalCharacters,
    setTotalCharacters,
    incrementCharacters,
    resetStats,
  };

  return (
    <StatsContext.Provider value={value}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
}

