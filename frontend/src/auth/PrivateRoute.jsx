import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { authToken } = useAuth();

  return authToken ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
