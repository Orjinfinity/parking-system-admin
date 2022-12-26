import React from 'react';
import { Title, View, Text, Block } from '../components';
import { BlockContextProvider } from '../contexts';

const Blocks = () => {
  return (
    <View>
      <Title
        mb="6px"
        color="textColor"
        fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
      >
        Blok Listesi
      </Title>
      <Text
        fontSize="small"
        color="textSecondaryColor"
        mb={['12px', '16px', '16px', '24px']}
      >
        Find all of your company’s administrator accounts and their associate
        roles.
      </Text>
      <BlockContextProvider>
        <Block />
      </BlockContextProvider>
    </View>
  );
};

export default Blocks;
