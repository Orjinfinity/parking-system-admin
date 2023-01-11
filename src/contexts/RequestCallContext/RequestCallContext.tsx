import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { IRequestCallAction, RequestCallActionTypes } from './Types';
import { getRequestCalls } from '../../services';
import { IRequestCallRow } from '../../consts';
import { requestCallReducer } from './Reducer';

export interface IRequestCallState {
  requestCalls: IRequestCallRow[];
  filter: {
    key: string;
    result: IRequestCallRow[];
  };
  page: number;
  totalRequestCalls: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: IRequestCallState = {
  requestCalls: [],
  filter: {
    key: '',
    result: [] as IRequestCallRow[],
  },
  page: 0,
  totalRequestCalls: 0,
  perPageRows: 10,
  loading: false,
};

interface IRequestCallContext {
  state: IRequestCallState;
  dispatch: Dispatch<IRequestCallAction>;
}

const RequestCallContext = createContext<IRequestCallContext>({
  state: {
    requestCalls: [],
    filter: {
      key: '',
      result: [] as IRequestCallRow[],
    },
    page: 0,
    totalRequestCalls: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const RequestCallContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestCallReducer, initialState);

  useEffect(() => {
    const fetchRequestCalls = async () => {
      dispatch({ type: RequestCallActionTypes.SET_LOADING, loading: true });
      const response = await getRequestCalls(state.page, state.perPageRows);
      const data = await response.data;
      const totalRequestCalls = data.totalItems as number;
      let requestCalls: IRequestCallRow[] = data.resultData;
      requestCalls = requestCalls.map((requestCall) => ({
        ...requestCall,
        created_at: new Date(requestCall.created_at).toLocaleString(),
      }));
      dispatch({
        type: RequestCallActionTypes.SET_REQUESTCALLS,
        requestCalls,
        totalRequestCalls,
      });
    };

    fetchRequestCalls().catch((_) =>
      dispatch({ type: RequestCallActionTypes.SET_LOADING, loading: false })
    );
  }, [state.page, state.perPageRows]);

  return (
    <RequestCallContext.Provider value={{ state, dispatch }}>
      {children}
    </RequestCallContext.Provider>
  );
};

export { RequestCallContext, RequestCallContextProvider };
