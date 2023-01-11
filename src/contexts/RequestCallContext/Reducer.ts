import { IRequestCallRow } from '../../consts';
import { IRequestCallState, initialState } from './RequestCallContext';
import { RequestCallActionTypes, IRequestCallAction } from './Types';

export const requestCallReducer = (
  state: IRequestCallState,
  action: IRequestCallAction
): typeof initialState => {
  switch (action.type) {
    case RequestCallActionTypes.SET_REQUESTCALLS: {
      return {
        ...state,
        requestCalls: action.requestCalls || ([] as Array<IRequestCallRow>),
        ...(action.totalRequestCalls && { totalRequestCalls: action.totalRequestCalls }),
        loading: false,
      };
    }
    case RequestCallActionTypes.SET_FILTERED_REQUESTCALLS: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        loading: false,
      };
    }
    case RequestCallActionTypes.ADD_REQUESTCALL: {
      const requestCalls =
        state.requestCalls.length === 10 ? state.requestCalls : [...state.requestCalls, action.requestCall];
      return {
        ...state,
        requestCalls,
        totalRequestCalls: state.totalRequestCalls + 1,
      };
    }
    case RequestCallActionTypes.UPDATE_REQUESTCALL: {
      const selectedRequestCallIndex =
        state.requestCalls.findIndex((requestCall) => requestCall.id === action.requestCall.id) ?? 0;
      const requestCalls = [...state.requestCalls];
      requestCalls.splice(selectedRequestCallIndex, 1);
      requestCalls.splice(selectedRequestCallIndex, 0, action.requestCall);
      return { ...state, requestCalls };
    }
    case RequestCallActionTypes.DELETE_REQUESTCALL: {
      return {
        ...state,
        requestCalls:
          state.requestCalls.filter((requestCall) => requestCall.id !== action.requestCall.id) ??
          state.requestCalls,
      };
    }
    case RequestCallActionTypes.DELETE_SELECTED_REQUESTCALLS: {
      return state;
    }
    case RequestCallActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case RequestCallActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case RequestCallActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
