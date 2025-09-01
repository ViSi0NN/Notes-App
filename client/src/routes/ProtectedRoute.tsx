import React from 'react';
import { Navigate } from 'react-router-dom';

// --- Redux Imports ---
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    
    return <div>Loading session...</div>;
  }

  if (!user) {
    // If not loading and no user, redirect to signin
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;