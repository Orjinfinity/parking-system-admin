import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { CarActionTypes, ICarAction } from './Types';
import { getCars, getCarsByApartmentId } from '../../services/Api/cars';
import { ICarRow } from '../../consts';
import { carReducer } from './Reducer';
import { getApartmentIdForAdmin, getUserIsApartmentAdmin } from '../../utils/userHelper';

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
  const isApartmentAdmin = getUserIsApartmentAdmin();

  useEffect(() => {
    const apartmentInfo = getApartmentIdForAdmin();
    const fetchCars = async () => {
      try {
        const carsEndpoint = isApartmentAdmin ? getCarsByApartmentId : getCars;
        dispatch({ type: CarActionTypes.SET_LOADING, loading: true });
        const response = await carsEndpoint(state.page, state.perPageRows, apartmentInfo?.id);
        const data = await response.data;
        const totalCars = data.totalItems as number;
        let cars: ICarRow[] = data.resultData;
        cars = cars.map((car) => ({
          ...car,
          isguest: car.isguest ? 'Evet' : 'Hayır',
          created_at: new Date(car.created_at).toLocaleString(),
        }));
        dispatch({ type: CarActionTypes.SET_CARS, cars, totalCars });
      } catch (error) {
        dispatch({ type: CarActionTypes.SET_LOADING, loading: false })
      }
    };

    fetchCars().catch((_) =>
      dispatch({ type: CarActionTypes.SET_LOADING, loading: false })
    );
  }, [state.page, state.perPageRows, isApartmentAdmin]);

  return (
    <CarContext.Provider value={{ state, dispatch }}>
      {children}
    </CarContext.Provider>
  );
};

export { CarContext, CarContextProvider };
