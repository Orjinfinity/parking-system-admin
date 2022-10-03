import React from 'react';
import styled from 'styled-components';
import { Title, View } from '../components';

const StyledView = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Login = () => {
  return (
    <StyledView display="flex" justifyContent="center" alignItems="center">
      <View>
        <Title fontSize={['1em', '1em', '2.7em']}>Plaka Tanıma Sistemi</Title>
        <View>
          <Title>Admin Paneline Hoşgeldiniz! 👋</Title>
          <p>Lütfen giriş bilgilerinizi giriniz</p>
        </View>
      </View>
    </StyledView>
  );
};

export default Login;
