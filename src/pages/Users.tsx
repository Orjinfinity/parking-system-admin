import { Title, View, Text, UserTable } from '../components';
import { UserContextProvider } from '../contexts';

const Users = () => {
  return (
    <View>
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
  );
};

export default Users;
