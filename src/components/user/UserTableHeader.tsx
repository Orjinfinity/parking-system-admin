import React, { useContext, useState } from 'react';
import { View, Button, ExportIcon, BasicTextField, UserPlusIcon } from '..';
import { getApartmentIdForAdmin, getUserIsApartmentAdmin } from '../../utils/userHelper';
import { getUsers, getUsersByApartmentId } from '../../services';
import { UserActionTypes, UserContext } from '../../contexts';
import { IUserRow } from '../../consts';

interface IUserTableHeader {
  handleUserFunctions: (type: string) => void;
}

const UserTableHeader = ({ handleUserFunctions }: IUserTableHeader) => {
  const [fetchedUsers, setFetchedUsers] = useState<Array<IUserRow>>([]);
  const { state, dispatch } = useContext(UserContext);
  const isApartmentAdmin = getUserIsApartmentAdmin();
  const apartmentInfo = getApartmentIdForAdmin();

  const setFilteredUsers = (key: string, users?: Array<IUserRow>) => {
    console.log(fetchedUsers, key);
    const filteredUsers = (users || fetchedUsers)
      .filter(({ name, surname, email, username }) =>
        [name, surname, email, username].some(
          (field) => field && field.toLowerCase().includes(key)
        )
      )
      .map(user => {
        if (!isApartmentAdmin) {
          return {
            ...user,
            roles: user?.roles[0]?.name || "user",
            ...(user.flats.length && {flatId: { id: user.flats[0]?.id, name: user.flats[0]?.number }}),
            created_at: new Date(user.created_at).toLocaleString(),
          }
        } else {
          return {
            ...user,
            roles: "user",
            flatId: { id: user?.FlatId, name: user?.FlatNumber} as any,
            created_at: new Date(user.created_at).toLocaleString(),
          }
        }
      })
    dispatch({
      type: UserActionTypes.SET_FILTERED_USERS,
      filter: { key, result: filteredUsers, },
      totalUsers: filteredUsers?.length || 0
    });
  };

  const fetchUsers = async (key: string) => {
    try {
      const usersEndpoint = isApartmentAdmin ? getUsersByApartmentId : getUsers;
      dispatch({ type: UserActionTypes.SET_LOADING, loading: true });
      const response = await usersEndpoint(state.page, state.totalUsers || 200, { apartmentId: apartmentInfo?.id });
      const data = await response.data;
      const users: IUserRow[] = data.resultData;
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
