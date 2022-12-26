import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { CarActionTypes, ICarAction } from './Types';
import { getCars } from '../../services/Api/cars';
import { ICarRow } from '../../consts';
import { carReducer } from './Reducer';

export interface ICarState {
  cars: ICarRow[];
  filter: {
    key: string;
    result: ICarRow[];
  };
  page: number;
  totalCars: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: ICarState = {
  cars: [] as ICarRow[],
  filter: {
    key: '',
    result: [] as ICarRow[],
  },
  page: 0,
  totalCars: 0,
  perPageRows: 10,
  loading: false,
};

interface ICarContext {
  state: ICarState;
  dispatch: Dispatch<ICarAction>;
}

const CarContext = createContext<ICarContext>({
  state: {
    cars: [] as ICarRow[],
    filter: {
      key: '',
      result: [] as ICarRow[],
    },
    page: 0,
    totalCars: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const CarContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(carReducer, initialState);
  
    useEffect(() => {
      const fetchCars = async () => {
        dispatch({ type: CarActionTypes.SET_LOADING, loading: true });
        const response = await getCars(state.page, state.perPageRows);
        const data = await response.data;
        const totalCars = data.totalItems as number;
        let cars: ICarRow[] = data.resultData;
        cars = cars.map((car) => ({
          ...car,
          created_at: new Date(car.created_at).toLocaleString(),
        }));
        dispatch({ type: CarActionTypes.SET_CARS, cars, totalCars });
      };
  
      fetchCars().catch((_) =>
        dispatch({ type: CarActionTypes.SET_LOADING, loading: false })
      );
    }, [state.page, state.perPageRows]);
  
    return (
      <CarContext.Provider value={{ state, dispatch }}>
        {children}
      </CarContext.Provider>
    );
};

export { CarContext, CarContextProvider }
