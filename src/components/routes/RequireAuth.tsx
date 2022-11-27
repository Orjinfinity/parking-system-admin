import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export interface IRequireAuth {
  children: ReactElement;
}

const RequireAuth = ({ children }: IRequireAuth): ReactElement => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default RequireAuth;
