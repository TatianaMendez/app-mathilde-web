import React from 'react';
import { Navigate } from 'react-router-dom';
import type { RootState } from '@store/store';
import { useSelector } from 'react-redux';

const RouterLogueado: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default RouterLogueado;