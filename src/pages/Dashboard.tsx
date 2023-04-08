import { Title, View, Text, UserTable, RoleList } from '../components';
import { UserContextProvider } from '../contexts';

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
