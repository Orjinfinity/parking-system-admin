import { useRef, useEffect } from 'react';
import { Title, View, Text, UserTable, RoleList } from '../components';
import { END_POINTS } from '../consts';
import { UserContextProvider } from '../contexts';
import { useFetch } from '../hooks/useFetch';
import { LocalStorageKeys } from '../interfaces';
import { getUserApartmentInfo } from '../utils';


const Dashboard = () => {
  // const userInfo = JSON.parse(localStorage.getItem(LocalStorageKeys.User));
  // const dataFetchRef = useRef<boolean>(true);
  // const { data } = useFetch(
  //   `${END_POINTS.USERS.users}/${userInfo.id}`,
  //   { single: true },
  //   dataFetchRef,
  //   {}
  // );
  
  // useEffect(() => {
  //   if (data && Object.keys(data).length) {
  //     const flats = data?.flats ? data.flats[0] : null;
  //     if(flats) {
  //       const apartment = getUserApartmentInfo(data?.flats[0]);
  //       const user = {...userInfo, apartment};
  //       localStorage.setItem(LocalStorageKeys.User, JSON.stringify(user));
  //       console.log('data', data, apartment)
  //     }
  //   }
  // }, [data, userInfo])
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
