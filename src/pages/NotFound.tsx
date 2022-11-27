import React from 'react';
import { Image, LinkButton, Title, View, Text } from '../components';
import { assetHelper } from '../utils';

const NotFound = () => {
  return (
    <View
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      backgroundColor="white"
    >
      <View display="flex" flexDirection="column" alignItems="center">
        <Title mb={['12px', '0']} fontSize={['90px', '70px']}>
          404
        </Title>
        <Title mb="12px">Sayfa Bulunamadı.</Title>
        <Text size="sm" color="rgba(58, 53, 65, 0.68)">
          Aradığınız sayfayı bulamadık.
        </Text>
      </View>
      <Image height="70%" src={assetHelper('404.jpg')} alt="404_not_found" />
      <LinkButton variant="contained" size="md" to="login" color="primary">
        Sayfaya geri dön
      </LinkButton>
    </View>
  );
};

export default NotFound;
