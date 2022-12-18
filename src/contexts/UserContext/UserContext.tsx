import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
} from 'react';
import { IUserRow } from '../../consts';
import { getUsers } from '../../services';
import { userReducer } from './Reducer';
import { IUserAction, UserActionTypes } from './Types';

export interface IUserState {
  users: IUserRow[];
  filter: {
    key: string,
    result: IUserRow[],
  },
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
  loading: false
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
    loading: false
  },
  dispatch: () => {},
});

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState as IUserState);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: UserActionTypes.SET_LOADING, loading: true })
      const response = await getUsers(state.page, state.perPageRows);
      const data = await response.data;
      const totalUsers = data.totalItems as number;
      let users: IUserRow[] = data.resultData;
      users = users.map((user) => ({
        ...user,
        created_at: new Date(user.created_at).toLocaleString(),
      }));
      dispatch({ type: UserActionTypes.SET_USERS, users, totalUsers });
    };
    fetchUsers().catch((_) => dispatch({ type: UserActionTypes.SET_LOADING, loading: false }));
  }, [state.page, state.perPageRows]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
