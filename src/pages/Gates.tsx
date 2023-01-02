import React from 'react';
import { Title, View, Text, Door} from '../components';
import { DoorContextProvider } from '../contexts';

const Gates = () => {
  return     <View>
  <Title
    mb="6px"
    color="textColor"
    fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
  >
    Giriş - Çıkış Kapı Listesi
  </Title>
  <Text
    fontSize="small"
    color="textSecondaryColor"
    mb={['12px', '16px', '16px', '24px']}
  >
    Find all of your company’s administrator accounts and their associate
    roles.
  </Text>
  <DoorContextProvider>
    <Door />
  </DoorContextProvider>
</View>
};

export default Gates;
