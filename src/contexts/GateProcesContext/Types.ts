import { IGateProcesRow } from '../../consts';

interface IGateProcesActionPayload {
  page: number;
  gateProces: IGateProcesRow;
  gateProcesses: Array<IGateProcesRow>;
  filter: {
    key: string;
    result: Array<IGateProcesRow>;
  };
  totalGateProcesses: number;
  deleteGateProcesses: Array<IGateProcesRow>;
  perPageRows: number;
  loading: boolean;
}

export enum GateProcesActionTypes {
  ADD_GATEPROCES = 'ADD_GATEPROCES',
  SET_GATEPROCESSES = 'SET_GATEPROCESSES',
  SET_FILTERED_GATEPROCESSES = 'SET_FILTERED_GATEPROCESSES',
  UPDATE_GATEPROCES = 'UPDATE_GATEPROCES',
  DELETE_GATEPROCES = 'DELETE_GATEPROCES',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_GATEPROCESSES = 'DELETE_SELECTED_GATEPROCESSES',
}

export interface IGateProcesAction extends Partial<IGateProcesActionPayload> {
  type: GateProcesActionTypes;
}
