import React, { useState } from 'react';
import { useConnectivity } from '../context';
import ConnectivityModal from './ui/ConnectivityModal';

interface ConnectivityWrapperProps {
  children: React.ReactNode;
}

export default function ConnectivityWrapper({ children }: ConnectivityWrapperProps) {
  const { isConnected, isLoading } = useConnectivity();
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    if (!isLoading && !isConnected) {
      setShowModal(true);
    } else if (isConnected) {
      setShowModal(false);
    }
  }, [isConnected, isLoading]);

  const handleRetry = () => {
    setShowModal(false);
    // El hook se encargará de detectar cuando vuelva la conexión
  };

  return (
    <>
      {children}
      <ConnectivityModal 
        visible={showModal} 
        onRetry={handleRetry}
      />
    </>
  );
}

