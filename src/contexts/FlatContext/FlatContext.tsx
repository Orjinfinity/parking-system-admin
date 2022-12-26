import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { FlatActionTypes, IFlatAction } from './Types';
import { getFlats } from '../../services';
import { IFlatRow } from '../../consts';
import { flatReducer } from './Reducer';

export interface IFlatState {
  flats: IFlatRow[];
  filter: {
    key: string;
    result: IFlatRow[];
  };
  page: number;
  totalFlats: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: IFlatState = {
  flats: [],
  filter: {
    key: '',
    result: [] as IFlatRow[],
  },
  page: 0,
  totalFlats: 0,
  perPageRows: 10,
  loading: false,
};

interface IFlarContext {
  state: IFlatState;
  dispatch: Dispatch<IFlatAction>;
}

const FlatContext = createContext<IFlarContext>({
  state: {
    flats: [],
    filter: {
      key: '',
      result: [] as IFlatRow[],
    },
    page: 0,
    totalFlats: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const FlatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(flatReducer, initialState);

  useEffect(() => {
    const fetchFlats = async () => {
      dispatch({ type: FlatActionTypes.SET_LOADING, loading: true });
      const response = await getFlats(state.page, state.perPageRows);
      const data = await response.data;
      const totalFlats = data.totalItems as number;
      let flats: IFlatRow[] = data.resultData;
      flats = flats.map((flat) => ({
        ...flat,
        created_at: new Date(flat.created_at).toLocaleString(),
      }));
      dispatch({ type: FlatActionTypes.SET_FLATS, flats, totalFlats });
    };

    fetchFlats().catch((_) =>
      dispatch({ type: FlatActionTypes.SET_LOADING, loading: false })
    );
  }, [state.page, state.perPageRows]);

  return (
    <FlatContext.Provider value={{ state, dispatch }}>
      {children}
    </FlatContext.Provider>
  );
};

export { FlatContext, FlatContextProvider };
