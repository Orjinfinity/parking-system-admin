import { IDoorRow } from "../../consts";

interface IDoorActionPayload {
  page: number;
  door: IDoorRow;
  doors: Array<IDoorRow>;
  filter: {
    key: string;
    result: Array<IDoorRow>;
  };
  totalDoors: number;
  deleteDoors: Array<IDoorRow>;
  perPageRows: number;
  loading: boolean;
}

export enum DoorActionTypes {
  ADD_DOOR = 'ADD_DOOR',
  SET_DOORS = 'SET_DOORS',
  SET_FILTERED_DOORS = 'SET_FILTERED_DOORS',
  UPDATE_DOOR = 'UPDATE_DOOR',
  DELETE_DOOR = 'DELETE_DOOR',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_DOORS = 'DELETE_SELECTED_DOORS',
}

export interface IDoorAction extends Partial<IDoorActionPayload> {
  type: DoorActionTypes;
}
