import { IApartmentRow } from '../../consts';

interface IApartmentActionPayload {
  page: number;
  apartment: IApartmentRow;
  apartments: Array<IApartmentRow>;
  filter: {
    key: string;
    result: Array<IApartmentRow>;
  };
  totalApartments: number;
  deleteApartments: Array<IApartmentRow>;
  perPageRows: number;
  loading: boolean;
}

export enum ApartmentActionTypes {
  ADD_APARTMENT = 'ADD_APARTMENT',
  SET_APARTMENTS = 'SET_APARTMENTS',
  SET_FILTERED_APARTMENTS = 'SET_FILTERED_APARTMENTS',
  UPDATE_APARTMENT = 'UPDATE_APARTMENT',
  DELETE_APARTMENT = 'DELETE_APARTMENT',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_APARTMENTS = 'DELETE_SELECTED_APARTMENTS',
}

export interface IApartmentAction extends Partial<IApartmentActionPayload> {
  type: ApartmentActionTypes;
}
