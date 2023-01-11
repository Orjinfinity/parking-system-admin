import { IRequestCallRow } from '../../consts';

interface IRequestCallActionPayload {
  page: number;
  requestCall: IRequestCallRow;
  requestCalls: Array<IRequestCallRow>;
  filter: {
    key: string;
    result: Array<IRequestCallRow>;
  };
  totalRequestCalls: number;
  deleteRequestCalls: Array<IRequestCallRow>;
  perPageRows: number;
  loading: boolean;
}

export enum RequestCallActionTypes {
  ADD_REQUESTCALL = 'ADD_REQUESTCALL',
  SET_REQUESTCALLS = 'SET_REQUESTCALLS',
  SET_FILTERED_REQUESTCALLS = 'SET_FILTERED_REQUESTCALLS',
  UPDATE_REQUESTCALL = 'UPDATE_REQUESTCALL',
  DELETE_REQUESTCALL = 'DELETE_REQUESTCALL',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_REQUESTCALLS = 'DELETE_SELECTED_REQUESTCALLS',
}

export interface IRequestCallAction extends Partial<IRequestCallActionPayload> {
  type: RequestCallActionTypes;
}
