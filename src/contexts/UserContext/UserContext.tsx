import { createContext, Dispatch, useEffect, useReducer, useRef, useState } from 'react';
import { IUserRow } from '../../consts';
import { getUsers } from '../../services';
import { setUsers } from './Actions';
import { userReducer } from './Reducer';

export interface IUserState {
  users: IUserRow[];
  page: number;
}

export const initialState: IUserState = {
  users: [],
  page: 0
};

enum UserActionTypes {
  ADD_USER = 'ADD_USER',
  SET_USERS = 'SET_USERS',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  DELETE_SELECTED_USERS = 'DELETE_SELECTED_USERS',
}

export type IUserAction = {
  page?: number;
  user?: IUserRow;
  type: UserActionTypes;
  users?: Array<IUserRow>;
  deleteUsers?: Array<IUserRow>;
};

interface IUserContext {
  state: IUserState;
  dispatch: Dispatch<IUserAction>;
  loading: boolean;
}

const UserContext = createContext<IUserContext>({
  state: {
    users: [] as IUserRow[],
    page: 0
  },
  loading: true,
  dispatch: () => {},
});

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState as IUserState);
  const [loading, setLoading] = useState<boolean>(true);
  const dataFetchRef = useRef<boolean>(true);
  
  useEffect(() => {
    if (dataFetchRef.current) {
      dataFetchRef.current = false;
      const fetchUsers = async () => {
        const response = await getUsers(0);
        let users: IUserRow[] = await response.data.resultData;
        users = users.map((user) => ({
          ...user,
          created_at: new Date(user.created_at).toLocaleString(),
        }));
        setUsers(dispatch, users);
        setLoading(false);
      };
      fetchUsers().catch((_) => setLoading(false));
    }
  }, [])

  return (
    <UserContext.Provider value={{ state, dispatch, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserActionTypes, UserContext, UserContextProvider };

