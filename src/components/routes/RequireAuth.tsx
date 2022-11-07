import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IRequireAuth {
  children: ReactElement;
}

const RequireAuth = ({ children }: IRequireAuth): ReactElement => {
  const location = useLocation();
  const isAuthenticated = true;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default RequireAuth;
