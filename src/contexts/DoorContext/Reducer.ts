import { IDoorRow } from '../../consts';
import { IDoorState, initialState } from './DoorContext';
import { DoorActionTypes, IDoorAction } from './Types';

export const doorReducer = (
  state: IDoorState,
  action: IDoorAction
): typeof initialState => {
  switch (action.type) {
    case DoorActionTypes.SET_DOORS: {
      return {
        ...state,
        doors: action.doors || ([] as Array<IDoorRow>),
        ...(action.totalDoors && { totalDoors: action.totalDoors }),
        loading: false,
      };
    }
    case DoorActionTypes.SET_FILTERED_DOORS: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        loading: false,
      };
    }
    case DoorActionTypes.ADD_DOOR: {
      const doors =
        state.doors.length === 10 ? state.doors : [...state.doors, action.door];
      return {
        ...state,
        doors,
        totalDoors: state.totalDoors + 1,
      };
    }
    case DoorActionTypes.UPDATE_DOOR: {
      const selectedDoorIndex =
        state.doors.findIndex((door) => door.id === action.door.id) ?? 0;
      const doors = [...state.doors];
      doors.splice(selectedDoorIndex, 1);
      doors.splice(selectedDoorIndex, 0, action.door);
      return { ...state, doors };
    }
    case DoorActionTypes.DELETE_DOOR: {
      return {
        ...state,
        doors:
          state.doors.filter((door) => door.id !== action.door.id) ?? state.doors,
      };
    }
    case DoorActionTypes.DELETE_SELECTED_DOORS: {
      return state;
    }
    case DoorActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case DoorActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case DoorActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
