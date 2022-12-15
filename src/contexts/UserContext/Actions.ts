import { Dispatch } from 'react';
import { IUserRow } from '../../consts';
import { IUserAction, UserActionTypes } from './UserContext';

const setUsers = (dispatch: Dispatch<IUserAction>, users: Array<IUserRow>) =>
  dispatch({ type: UserActionTypes.SET_USERS, users });
const addUser = (dispatch: Dispatch<IUserAction>, user: IUserRow) =>
  dispatch({ type: UserActionTypes.ADD_USER, user });
const updateUser = (dispatch: Dispatch<IUserAction>, user: IUserRow) =>
  dispatch({ type: UserActionTypes.UPDATE_USER, user });
const deleteUser = (dispatch: Dispatch<IUserAction>, user: IUserRow) =>
  dispatch({ type: UserActionTypes.DELETE_USER, user });
const deleteUsers = (dispatch: Dispatch<IUserAction>, users: Array<IUserRow>) =>
  dispatch({ type: UserActionTypes.ADD_USER, deleteUsers: users });

export { setUsers, addUser, updateUser, deleteUser, deleteUsers };
