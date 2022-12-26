import { IFlatRow } from '../../consts';
import { IFlatState, initialState } from './FlatContext';
import { FlatActionTypes, IFlatAction } from './Types';

export const flatReducer = (
  state: IFlatState,
  action: IFlatAction
): typeof initialState => {
  switch (action.type) {
    case FlatActionTypes.SET_FLATS: {
      return {
        ...state,
        flats: action.flats || ([] as Array<IFlatRow>),
        ...(action.totalFlats && { totalFlats: action.totalFlats }),
        loading: false,
      };
    }
    case FlatActionTypes.SET_FILTERED_FLATS: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        loading: false,
      };
    }
    case FlatActionTypes.ADD_FLAT: {
      const flats =
        state.flats.length === 10
          ? state.flats
          : [...state.flats, action.flat];
      return {
        ...state,
        flats,
        totalFlats: state.totalFlats + 1,
      };
    }
    case FlatActionTypes.UPDATE_FLAT: {
      const selectedFlatIndex =
        state.flats.findIndex((flat) => flat.id === action.flat.id) ??
        0;
      const flats = [...state.flats];
      flats.splice(selectedFlatIndex, 1);
      flats.splice(selectedFlatIndex, 0, action.flat);
      return { ...state, flats };
    }
    case FlatActionTypes.DELETE_FLAT: {
      return {
        ...state,
        flats:
          state.flats.filter((flat) => flat.id !== action.flat.id) ??
          state.flats,
      };
    }
    case FlatActionTypes.DELETE_SELECTED_FLATS: {
      return state;
    }
    case FlatActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case FlatActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case FlatActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
