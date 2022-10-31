import React from 'react';
import styled from "styled-components";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { View } from '../components';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';

const SectionStyled = styled('section')`
  width: 100%;
  display: flex;
  flex-direction: column;
  alignItems: center;
  justify-content: space-between;
`

const PrivateLayout = () => {
  const location = useLocation();
  const isAuthenticated = true;

  if (!isAuthenticated)
    return <Navigate to="/login" replace state={{ from: location }} />;

  return (
    <View
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      alignItems="space-between"
      backgroundColor="bgLayout"
    >
      <View display="flex" justifyContent="space-between">
        <Sidebar />
        <SectionStyled>
          <Header />
          <Outlet />
          <Footer />
        </SectionStyled>
      </View>
    </View>
  );
};

export default PrivateLayout;
