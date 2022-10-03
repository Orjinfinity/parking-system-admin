import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const PrivateLayout = () => {
  const location = useLocation();
  const isAuthenticated = false;

  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return (
    <div>
      <Header />
      <section>
        <Sidebar />
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
