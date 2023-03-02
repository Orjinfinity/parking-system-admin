import { IGateProcesRow } from '../../consts';
import { IGateProcesState, initialState } from './GateProcesContex';
import { GateProcesActionTypes, IGateProcesAction } from './Types';

export const gateProcesReducer = (
  state: IGateProcesState,
  action: IGateProcesAction
): typeof initialState => {
  switch (action.type) {
    case GateProcesActionTypes.SET_GATEPROCESSES: {
      return {
        ...state,
        gateProcesses: action.gateProcesses || ([] as Array<IGateProcesRow>),
        ...(action.totalGateProcesses && { totalGateProcesses: action.totalGateProcesses }),
        loading: false,
      };
    }
    case GateProcesActionTypes.SET_FILTERED_GATEPROCESSES: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        ...(action.totalGateProcesses && { totalGateProcesses: action.totalGateProcesses }),
        loading: false,
      };
    }
    case GateProcesActionTypes.ADD_GATEPROCES: {
      const gateProcesses =
        state.gateProcesses.length === 10 ? state.gateProcesses : [...state.gateProcesses, action.gateProces];
      return {
        ...state,
        gateProcesses,
        totalGateProcesses: state.totalGateProcesses + 1,
      };
    }
    case GateProcesActionTypes.UPDATE_GATEPROCES: {
      const selectedGateProcesIndex =
        state.gateProcesses.findIndex((gateProces) => gateProces.id === action.gateProces.id) ?? 0;
      const gateProcesses = [...state.gateProcesses];
      gateProcesses.splice(selectedGateProcesIndex, 1);
      gateProcesses.splice(selectedGateProcesIndex, 0, action.gateProces);
      return { ...state, gateProcesses };
    }
    case GateProcesActionTypes.DELETE_GATEPROCES: {
      return {
        ...state,
        gateProcesses:
          state.gateProcesses.filter((gateProces) => gateProces.id !== action.gateProces.id) ??
          state.gateProcesses,
      };
    }
    case GateProcesActionTypes.DELETE_SELECTED_GATEPROCESSES: {
      return state;
    }
    case GateProcesActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case GateProcesActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case GateProcesActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
