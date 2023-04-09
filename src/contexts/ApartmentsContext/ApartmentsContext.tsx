import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { IApartmentRow } from '../../consts/Table/Apartments';
import { getApartments } from '../../services';
import { apartmentReducer } from './Reducer';
import { ApartmentActionTypes, IApartmentAction } from './Types';

export interface IApartmentState {
  apartments: IApartmentRow[];
  filter: {
    key: string;
    result: IApartmentRow[];
  };
  page: number;
  totalApartments: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: IApartmentState = {
  apartments: [],
  filter: {
    key: '',
    result: [] as IApartmentRow[],
  },
  page: 0,
  totalApartments: 0,
  perPageRows: 10,
  loading: false,
};

interface IApartmentContext {
  state: IApartmentState;
  dispatch: Dispatch<IApartmentAction>;
}

const ApartmentContext = createContext<IApartmentContext>({
  state: {
    apartments: [] as IApartmentRow[],
    filter: {
      key: '',
      result: [] as IApartmentRow[],
    },
    page: 0,
    totalApartments: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const ApartmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(apartmentReducer, initialState);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        dispatch({ type: ApartmentActionTypes.SET_LOADING, loading: true });
        const response = await getApartments(state.page, state.perPageRows);
        const data = await response.data;
        const totalApartments = data.totalItems as number;
        let apartments: IApartmentRow[] = data.resultData;
        apartments = apartments.map((apartment) => ({
          ...apartment,
          created_at: new Date(apartment.created_at).toLocaleString(),
        }));
        dispatch({
          type: ApartmentActionTypes.SET_APARTMENTS,
          apartments,
          totalApartments,
        });
      } catch (error) {
        dispatch({ type: ApartmentActionTypes.SET_LOADING, loading: false });
      }
    };

    fetchApartments().catch((_) =>
      dispatch({ type: ApartmentActionTypes.SET_LOADING, loading: false })
    );
  }, [state.page, state.perPageRows]);

  return (
    <ApartmentContext.Provider value={{ state, dispatch }}>
      {children}
    </ApartmentContext.Provider>
  );
};

export { ApartmentContext, ApartmentsContextProvider };
