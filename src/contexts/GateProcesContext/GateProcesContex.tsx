import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { IGateProcesRow } from '../../consts';
import { getGateProcesses } from '../../services';
import { gateProcesReducer } from './Reducer';
import { GateProcesActionTypes, IGateProcesAction } from './Types';

export interface IGateProcesState {
  gateProcesses: IGateProcesRow[];
  filter: {
    key: string;
    result: IGateProcesRow[];
  };
  page: number;
  totalGateProcesses: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: IGateProcesState = {
  gateProcesses: [],
  filter: {
    key: '',
    result: [] as IGateProcesRow[],
  },
  page: 0,
  totalGateProcesses: 0,
  perPageRows: 10,
  loading: false,
};

interface IGateProcesContext {
  state: IGateProcesState;
  dispatch: Dispatch<IGateProcesAction>;
}

const GateProcesContext = createContext<IGateProcesContext>({
  state: {
    gateProcesses: [],
    filter: {
      key: '',
      result: [] as IGateProcesRow[],
    },
    page: 0,
    totalGateProcesses: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const GateProcesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gateProcesReducer, initialState);
  
    useEffect(() => {
      const fetchGateProcesses = async () => {
        dispatch({ type: GateProcesActionTypes.SET_LOADING, loading: true });
        const response = await getGateProcesses(state.page, state.perPageRows);
        const data = await response.data;
        const totalGateProcesses = data.totalItems as number;
        let gateProcesses: IGateProcesRow[] = data.resultData;
        gateProcesses = gateProcesses.map((gateProces) => ({
          ...gateProces,
          created_at: new Date(gateProces.created_at).toLocaleString(),
        }));
        dispatch({
          type: GateProcesActionTypes.SET_GATEPROCESSES,
          gateProcesses,
          totalGateProcesses,
        });
      };
  
      fetchGateProcesses().catch((_) =>
        dispatch({ type: GateProcesActionTypes.SET_LOADING, loading: false })
      );
    }, [state.page, state.perPageRows]);
  
    return (
      <GateProcesContext.Provider value={{ state, dispatch }}>
        {children}
      </GateProcesContext.Provider>
    );
  };
  
  export { GateProcesContext, GateProcesContextProvider };