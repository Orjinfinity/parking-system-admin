import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { View } from '../components';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';

const SectionStyled = styled('section')`
  min-height: 100vh;
  width: 100%;
  display: flex;
  padding: 0 0 0 260px;
  flex-direction: column;
  justify-content: space-between;
`;

const PrivateLayout = () => {
  return (
    <View
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      backgroundColor="bgLayout"
    >
      <View display="flex" justifyContent="space-between">
        <Sidebar />
        <SectionStyled>
          <Header />
          <View flex="1" p={[12, 12, 12, 16, 16]}>
            <Outlet />
          </View>
          <Footer/>
        </SectionStyled>
      </View>
    </View>
  );
};

export default PrivateLayout;
