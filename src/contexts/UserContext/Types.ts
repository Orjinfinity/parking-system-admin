import { IUserRow } from '../../consts';

interface IUserActionPayload {
  page: number;
  user: IUserRow;
  users: Array<IUserRow>;
  filter: {
    key: string;
    result: Array<IUserRow>;
  };
  totalUsers: number;
  deleteUsers: Array<IUserRow>;
  perPageRows: number;
  loading: boolean;
}

export enum UserActionTypes {
  ADD_USER = 'ADD_USER',
  SET_USERS = 'SET_USERS',
  SET_FILTERED_USERS = 'SET_FILTERED_USERS',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_USERS = 'DELETE_SELECTED_USERS',
}

export interface IUserAction extends Partial<IUserActionPayload> {
  type: UserActionTypes;
}
