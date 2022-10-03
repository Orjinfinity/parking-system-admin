import React from 'react';
import { Outlet } from 'react-router-dom';
import { View } from '../components';

const PublicLayout = () => {
  return (
    <View
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Outlet />
    </View>
  );
};

export default PublicLayout;
