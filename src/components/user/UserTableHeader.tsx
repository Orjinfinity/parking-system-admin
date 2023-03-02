import React, { useContext, useState } from 'react';
import { View, Button, ExportIcon, BasicTextField, UserPlusIcon } from '..';
import { UserActionTypes, UserContext } from '../../contexts';
import { getUsers } from '../../services';
import { IUserRow } from '../../consts';

interface IUserTableHeader {
  handleUserFunctions: (type: string) => void;
}

const UserTableHeader = ({ handleUserFunctions }: IUserTableHeader) => {
  const [fetchedUsers, setFetchedUsers] = useState<Array<IUserRow>>([]);
  const { state, dispatch } = useContext(UserContext);

  const setFilteredUsers = (key: string, users?: Array<IUserRow>) => {
    console.log(fetchedUsers, key);
    const filteredUsers = (users || fetchedUsers)
      .filter(({ name, surname, email, username }) =>
        [name, surname, email, username].some(
          (field) => field && field.toLowerCase().includes(key)
        )
      )
      .map(
        ({
          id,
          name,
          surname,
          username,
          email,
          password,
          phone,
          roles,
          created_at,
        }) => ({
          id,
          name,
          surname,
          email,
          password,
          phone,
          roles: roles[0]?.name || 'user',
          username,
          created_at: new Date(created_at).toLocaleString(),
        })
      );
    dispatch({
      type: UserActionTypes.SET_FILTERED_USERS,
      filter: { key, result: filteredUsers, },
      totalUsers: filteredUsers?.length || 0
    });
  };

  const fetchUsers = async (key: string) => {
    try {
      dispatch({ type: UserActionTypes.SET_LOADING, loading: true });
      const response = await getUsers(0, state.totalUsers || 200);
      const users: IUserRow[] = await response.data.resultData;
      setFilteredUsers(key, users)
      setFetchedUsers(users);
    } catch (error) {
      console.log(error);
      setFetchedUsers([]);
    }
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if (key && key.length > 2) {
      if (!(fetchedUsers && fetchedUsers.length)) fetchUsers(key);
      setFilteredUsers(key);
    } else
      dispatch({
        type: UserActionTypes.SET_FILTERED_USERS,
        filter: { key: '', result: [] as IUserRow[]},
        ...(fetchedUsers?.length && { totalUsers: fetchedUsers.length})
      });
  };

  return (
    <View
      display="flex"
      width="100%"
      justifyContent="space-between"
      mt="20px"
      mb="20px"
      height="38px"
    >
      <Button
        fontSize="medium"
        letterSpacing=".46px"
        variant="dashed"
        color="gray"
        size="md"
        ml="-5px"
      >
        <ExportIcon size="20px" mr="8px" mb="4px" />
        Export
      </Button>
      <View display="flex">
        <BasicTextField
          name="search"
          placeholder="Kullanıcı Ara"
          onChange={handleSearchInput}
        />
        <Button
          fontSize="medium"
          letterSpacing=".46px"
          variant="contained"
          color="primary"
          ml="16px"
          size="md"
          onClick={() => handleUserFunctions('add')}
        >
          <UserPlusIcon size="24px" mr="8px" mb="2px" />
          Yeni Kullanıcı
        </Button>
      </View>
    </View>
  );
};

export default UserTableHeader;
