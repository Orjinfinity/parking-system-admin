import { IFlatRow } from '../../consts';

interface IFlatActionPayload {
  page: number;
  flat: IFlatRow;
  flats: Array<IFlatRow>;
  filter: {
    key: string;
    result: Array<IFlatRow>;
  };
  totalFlats: number;
  deleteFlats: Array<IFlatRow>;
  selectedBlock: number;
  perPageRows: number;
  loading: boolean;
}

export enum FlatActionTypes {
  ADD_FLAT = 'ADD_FLAT',
  SET_FLATS = 'SET_FLATS',
  SET_FILTERED_FLATS = 'SET_FILTERED_FLATS',
  SET_BLOCK = 'SET_BLOCK',
  UPDATE_FLAT = 'UPDATE_FLAT',
  DELETE_FLAT = 'DELETE_FLAT',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_FLATS = 'DELETE_SELECTED_FLATS',
}

export interface IFlatAction extends Partial<IFlatActionPayload> {
  type: FlatActionTypes;
}
