import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { IRequestCallAction, RequestCallActionTypes } from './Types';
import { getRequestCalls, getRequestCallsByApartmentId } from '../../services';
import { IRequestCallRow } from '../../consts';
import { requestCallReducer } from './Reducer';
import { getApartmentIdForAdmin, getUserIsApartmentAdmin } from '../../utils/userHelper';

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
    const isApartmentAdmin = getUserIsApartmentAdmin();
    const apartmentInfo = getApartmentIdForAdmin();
    const fetchRequestCalls = async () => {
      try {
        const requestCallEndpoint = isApartmentAdmin ? getRequestCallsByApartmentId : getRequestCalls;
        dispatch({ type: RequestCallActionTypes.SET_LOADING, loading: true });
        const response = await requestCallEndpoint(state.page, state.perPageRows, apartmentInfo?.id);
        const data = await response.data;
        const totalRequestCalls = data.totalItems as number;
        let requestCalls: IRequestCallRow[] = data.resultData;
        requestCalls = requestCalls.map((requestCall) => ({
          ...requestCall,
          isdone: requestCall.isdone.toString(),
          created_at: new Date(requestCall.created_at).toLocaleString(),
        }));
        dispatch({
          type: RequestCallActionTypes.SET_REQUESTCALLS,
          requestCalls,
          totalRequestCalls,
        });
      } catch (error) {
        dispatch({ type: RequestCallActionTypes.SET_LOADING, loading: false });
      }
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
