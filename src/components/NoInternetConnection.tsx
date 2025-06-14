import React, { useEffect, useState } from 'react';
import Button from './shared/Button';

interface NoInternetConnectionProps {
  children: React.ReactNode;
}

const NoInternetConnection: React.FC<NoInternetConnectionProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 container text-center">
          <div className="text-6xl mb-4">📡</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Internet Connection</h1>
          <p className="text-gray-600 mb-6">Please check your internet connection and try again.</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default NoInternetConnection;
