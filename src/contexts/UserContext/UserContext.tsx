import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { IUserRow } from '../../consts';
import { getUsers, getUsersByApartmentId } from '../../services';
import { getApartmentIdForAdmin, getUserIsApartmentAdmin } from '../../utils/userHelper';
import { userReducer } from './Reducer';
import { IUserAction, UserActionTypes } from './Types';

export interface IUserState {
  users: IUserRow[];
  filter: {
    key: string;
    result: IUserRow[];
  };
  page: number;
  totalUsers: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: IUserState = {
  users: [],
  filter: {
    key: '',
    result: [] as IUserRow[],
  },
  page: 0,
  totalUsers: 0,
  perPageRows: 10,
  loading: false,
};

interface IUserContext {
  state: IUserState;
  dispatch: Dispatch<IUserAction>;
}

const UserContext = createContext<IUserContext>({
  state: {
    users: [] as IUserRow[],
    filter: {
      key: '',
      result: [] as IUserRow[],
    },
    page: 0,
    totalUsers: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState as IUserState);
  const isApartmentAdmin = getUserIsApartmentAdmin();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apartmentInfo = getApartmentIdForAdmin();
        const usersEndpoint = isApartmentAdmin ? getUsersByApartmentId : getUsers;
        dispatch({ type: UserActionTypes.SET_LOADING, loading: true });
        const response = await usersEndpoint(state.page, state.perPageRows, { apartmentId: apartmentInfo?.id });
        const data = await response.data;
        const totalUsers = data.totalItems as number;
        let users: IUserRow[] = data.resultData;
        if (!isApartmentAdmin) {
          users = users.map((user) => ({
            ...user,
            roles: user?.roles[0]?.name || "user",
            ...(user.flats.length && {flatId: { id: user.flats[0]?.id, name: user.flats[0]?.number }}),
            created_at: new Date(user.created_at).toLocaleString(),
          }));
        } else {
          users = users.map((user: any) => ({
            ...user,
            roles: "user",
            flatId: { id: user?.FlatId, name: user?.FlatNumber},
            created_at: new Date(user.created_at).toLocaleString(),
          }));
        }
        console.log('users', users)
        dispatch({ type: UserActionTypes.SET_USERS, users, totalUsers });
      } catch (error) {
        dispatch({ type: UserActionTypes.SET_LOADING, loading: false })
      }
    };
    fetchUsers().catch((_) =>
      dispatch({ type: UserActionTypes.SET_LOADING, loading: false })
    );
  }, [state.page, state.perPageRows, isApartmentAdmin]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
