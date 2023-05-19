import React from 'react';
import styled from 'styled-components';
import { View } from '../components';

const StyledView = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px;
  margin: auto 16px auto;
  border-radius: 5px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textColor};
  box-shadow: ${({ theme }) => theme.shadows.primary};
`;

const Footer = () => {
  return (
    <StyledView fontSize={['0.6rem', '0.8rem', '0.8rem', '1rem', '1rem']}>
      Copyright © 2023 | Designed With by <a style={{color:"red"}} target="_blank" href="https://www.orjinfinity.com/">Orjinfinity</a>. All
      Rights Reserved
    </StyledView>
  );
};

export default Footer;
