import React, { useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { View } from '../components';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import MobileHeader from '../components/mobileheader/MobileHeader';
import MenuIcon from "../components/icons/MenuIcon";
import CloseIcon from "../components/icons/CloseIcon";

 const SectionStyled = styled('section')`
  min-height: 100vh;
  width: 100%;
  display: flex;
  padding: 0 0 0 260px;
  flex-direction: column;
  justify-content: space-between;

  @media(max-width:768px) {
    padding:0px;
  }
`;

const PrivateLayout = () => {

  const [mobile, setMobile] = useState<boolean>(false);

    const handleClick = () => {
            
            setMobile(!mobile)
    }
    console.log(mobile)
  return (
    <View
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      backgroundColor="bgLayout"
    >
      <MobileHeader handleClick={handleClick}>
             {mobile ?  <CloseIcon size="24px" color="#000" /> :  <MenuIcon size="24px" color="#000" />}
        </MobileHeader>
       <View display="flex" justifyContent="space-between">
     
          {mobile ? <Sidebar />  : null }  
          <View display={['none', 'none', 'none','none','block']}  ><Sidebar/></View>
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
