import React from 'react';
import { Title, View, Text, ApartmentTable } from '../components';
import { ApartmentsContextProvider } from '../contexts';

const Apartments = () => {
  return (
    <View>
      <Title
        mb="6px"
        color="textColor"
        fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
      >
        Site Listesi
      </Title>
      <Text
        color="textSecondaryColor"
        mb={['12px', '16px', '16px', '24px']}
        fontSize={['0.6rem', '0.8rem', '0.8rem', '1rem', '1rem']}
      >
        Find all of your company’s administrator accounts and their associate
        roles.
      </Text>
      <ApartmentsContextProvider>
        <ApartmentTable />
      </ApartmentsContextProvider>
    </View>
  );
};

export default Apartments;
