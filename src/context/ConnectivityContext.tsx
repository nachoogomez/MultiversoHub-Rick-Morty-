import React, { createContext, useContext, ReactNode } from 'react';
import { useConectivity } from '../hooks/useConectivity';

interface ConnectivityContextType {
  isConnected: boolean;
  isLoading: boolean;
}

const ConnectivityContext = createContext<ConnectivityContextType | undefined>(undefined);

interface ConnectivityProviderProps {
  children: ReactNode;
}

export function ConnectivityProvider({ children }: ConnectivityProviderProps) {
  const { isConnected, isLoading } = useConectivity();

  const value: ConnectivityContextType = {
    isConnected,
    isLoading,
  };

  return (
    <ConnectivityContext.Provider value={value}>
      {children}
    </ConnectivityContext.Provider>
  );
}

export function useConnectivity() {
  const context = useContext(ConnectivityContext);
  if (context === undefined) {
    throw new Error('useConnectivity must be used within a ConnectivityProvider');
  }
  return context;
}

