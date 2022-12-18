import React, { useContext } from 'react';
import { UserActionTypes, UserContext } from '../../contexts';
import { getUsers } from '../../services';
import { IUserRow } from '../../consts';
import { BasicTextField } from '../textfield/TextField';
import UserPlusIcon from '../icons/UserPlusIcon';
import ExportIcon from '../icons/ExportIcon';
import Button from '../button/Button';
import View from '../view/View';

interface IUserTableHeader {
  handleUserFunctions: (type: string) => void;
}

const UserTableHeader = ({ handleUserFunctions }: IUserTableHeader) => {
  const { state, dispatch } = useContext(UserContext);

  const fetchUsers = async (key: string) => {
    const response = await getUsers(0, state.totalUsers || 200);
    const users: IUserRow[] = await response.data.resultData;
    const filteredUsers = users.filter(({ name, surname, email, username }) =>
      [name, surname, email, username].some((field) => field.toLowerCase().includes(key))
    ).map(user => ({...user, created_at: new Date(user.created_at).toLocaleString()}));

    dispatch({ type: UserActionTypes.SET_FILTERED_USERS, filter: { key, result: filteredUsers } });
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value.toLowerCase() || '';
    if(key && key.length > 2) {
      dispatch({ type: UserActionTypes.SET_LOADING, loading: true });
      fetchUsers(key);
    } else dispatch({ type: UserActionTypes.SET_FILTERED_USERS, filter: { key: "", result: [] as IUserRow[] } });
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
