import { initialState, IUserState } from './UserContext';
import { IUserRow } from '../../consts';
import { IUserAction, UserActionTypes } from './Types';

export const userReducer = (
  state: IUserState,
  action: IUserAction
): typeof initialState => {
  switch (action.type) {
    case UserActionTypes.SET_USERS: {
      return {
        ...state,
        users: action.users || ([] as Array<IUserRow>),
        ...(action.totalUsers && { totalUsers: action.totalUsers }),
        loading: false,
      };
    }
    case UserActionTypes.SET_FILTERED_USERS: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        loading: false,
      };
    }
    case UserActionTypes.ADD_USER: {
      const users =
        state.users.length === 10 ? state.users : [...state.users, action.user];
      return { ...state, users, totalUsers: state.totalUsers + 1 };
    }
    case UserActionTypes.UPDATE_USER: {
      const selectedUserIndex =
        state.users.findIndex((user) => user.id === action.user.id) ?? 0;
      const users = [...state.users];
      users.splice(selectedUserIndex, 1);
      users.splice(selectedUserIndex, 0, action.user);
      return { ...state, users };
    }
    case UserActionTypes.DELETE_USER: {
      return {
        ...state,
        users:
          state.users.filter((user) => user.id !== action.user.id) ??
          state.users,
      };
    }
    case UserActionTypes.DELETE_SELECTED_USERS: {
      return state;
    }
    case UserActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case UserActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case UserActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
