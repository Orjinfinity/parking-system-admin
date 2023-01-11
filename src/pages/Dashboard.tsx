import styled from 'styled-components';
import { Title, View, Text, Role, UserTable, RoleList } from '../components';
// import { roles } from '../consts';
import { UserContextProvider } from '../contexts';

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
    grid-gap: 24px;
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 24px;
  }
`;

const Dashboard = () => {
  return (
    <View>
      <Title
        mb="6px"
        color="textColor"
        fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
      >
        Role Listesi
      </Title>
      <Text
        fontSize="small"
        color="textSecondaryColor"
        mb={['12px', '16px', '16px', '24px']}
      >
        A role provided access to predefined menus and features so that
        depending on assigned role an administrator can have access to what he
        need.
      </Text>
      {/* <CardContainer>
        {roles.map((roleProps, index) => (
          <Role key={index} {...roleProps} />
        ))}
        <Role />
      </CardContainer> */}
        <RoleList/>
      <View mt="40px">
        <Title
          mb="6px"
          color="textColor"
          fontSize={['1rem', '1rem', '1.2rem', '1.5rem']}
        >
          Kullanıcı Listesi
        </Title>
        <Text
          fontSize="small"
          color="textSecondaryColor"
          mb={['12px', '16px', '16px', '24px']}
        >
          Find all of your company’s administrator accounts and their associate
          roles.
        </Text>
        <UserContextProvider>
          <UserTable />
        </UserContextProvider>
      </View>
    </View>
  );
};

export default Dashboard;
