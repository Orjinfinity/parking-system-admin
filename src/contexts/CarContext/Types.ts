import { ICarRow } from '../../consts';

interface ICarActionPayload {
  page: number;
  car: ICarRow;
  cars: Array<ICarRow>;
  filter: {
    key: string;
    result: Array<ICarRow>;
  };
  totalCars: number;
  deleteCars: Array<ICarRow>;
  perPageRows: number;
  loading: boolean;
}

export enum CarActionTypes {
  ADD_CAR = 'ADD_CAR',
  SET_CARS = 'SET_CARS',
  SET_FILTERED_CARS = 'SET_FILTERED_CARS',
  UPDATE_CAR = 'UPDATE_CAR',
  DELETE_CAR = 'DELETE_CAR',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_CARS = 'DELETE_SELECTED_CARS',
}

export interface ICarAction extends Partial<ICarActionPayload> {
  type: CarActionTypes;
}
