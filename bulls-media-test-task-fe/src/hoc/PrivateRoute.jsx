import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import { userDataSelector } from '../store/auth';

export const PrivateRoute = () => {
  const userData = useSelector(userDataSelector);

  return userData ? <Outlet /> : <Navigate to="/login" />;
};
