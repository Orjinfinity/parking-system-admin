import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { View } from '../components';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';

const PrivateLayout = () => {
  const location = useLocation();
  const isAuthenticated = false;

  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return (
    <View>
      <Header />
      <section>
        <Sidebar />
        <Outlet />
      </section>
      <Footer />
    </View>
  );
};

export default PrivateLayout;
