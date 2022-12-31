import { ICarRow } from '../../consts';
import { ICarState, initialState } from './CarContext';
import { CarActionTypes, ICarAction } from './Types';

export const carReducer = (
  state: ICarState,
  action: ICarAction
): typeof initialState => {
  switch (action.type) {
    case CarActionTypes.SET_CARS: {
      return {
        ...state,
        cars: action.cars || ([] as Array<ICarRow>),
        ...(action.totalCars && { totalCars: action.totalCars }),
        loading: false,
      };
    }
    case CarActionTypes.SET_FILTERED_CARS: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        loading: false,
      };
    }
    case CarActionTypes.ADD_CAR: {
      const cars =
        state.cars.length === 10 ? state.cars : [...state.cars, action.car];
      return {
        ...state,
        cars,
        totalCars: state.totalCars + 1,
      };
    }
    case CarActionTypes.UPDATE_CAR: {
      const selectedCarIndex =
        state.cars.findIndex((car) => car.id === action.car.id) ?? 0;
      const cars = [...state.cars];
      cars.splice(selectedCarIndex, 1);
      cars.splice(selectedCarIndex, 0, action.car);
      return { ...state, cars };
    }
    case CarActionTypes.DELETE_CAR: {
      return {
        ...state,
        cars:
          state.cars.filter((car) => car.id !== action.car.id) ?? state.cars,
      };
    }
    case CarActionTypes.DELETE_SELECTED_CARS: {
      return state;
    }
    case CarActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case CarActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case CarActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
