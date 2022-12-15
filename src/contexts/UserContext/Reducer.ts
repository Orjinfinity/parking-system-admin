import { initialState, IUserAction, IUserState, UserActionTypes } from './UserContext';
import { IUserRow } from '../../consts';

export const userReducer = (
  state: IUserState,
  action: IUserAction
): typeof initialState => {
  switch (action.type) {
    case UserActionTypes.SET_USERS: {
      return { ...state, users: action.users || ([] as Array<IUserRow>) };
    }
    case UserActionTypes.ADD_USER: {
      return { ...state, users: [...state.users, action.user] };
    }
    case UserActionTypes.UPDATE_USER: {
      const selectedUserIndex = state.users.findIndex((user) => user.id === action.user.id) ?? 0;
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
    case UserActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    default:
      return state;
  }
};
