import React from 'react';
import { useConnectivity } from '../context';
import ConnectivityBanner from './ui/ConnectivityBanner';

interface ConnectivityWrapperProps {
  children: React.ReactNode;
}

export default function ConnectivityWrapper({ children }: ConnectivityWrapperProps) {
  const { isConnected, isLoading } = useConnectivity();

  return (
    <>
      <ConnectivityBanner visible={!isLoading && !isConnected} />
      {children}
    </>
  );
}

