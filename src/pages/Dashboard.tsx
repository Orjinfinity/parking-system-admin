import React from 'react';
import styled from 'styled-components';
import { Title, View, Text, Role } from '../components';

const CardContainer = styled(View)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 48px;

  @media screen and (max-width: 1700px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  }
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 24px
  }

`

const Dashboard = () => {
  return (
    <View>
      <Title mb="6px" color="textColor" fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}>Roles List</Title>
      <Text fontSize="small" color="textSecondaryColor" mb={['12px','16px','16px','24px']}>
        A role provided access to predefined menus and features so that
        depending on assigned role an administrator can have access to what he
        need.
      </Text>
      <CardContainer>
        <Role/>
        <Role/>
        <Role/>
        <Role/>
        <Role/>
      </CardContainer>
    </View>
  );
};

export default Dashboard;
