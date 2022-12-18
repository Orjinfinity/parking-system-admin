import { IApartmentRow } from '../../consts';
import { IApartmentState, initialState } from './ApartmentsContext';
import { ApartmentActionTypes, IApartmentAction } from './Types';

export const apartmentReducer = (
  state: IApartmentState,
  action: IApartmentAction
): typeof initialState => {
  switch (action.type) {
    case ApartmentActionTypes.SET_APARTMENTS: {
      return {
        ...state,
        apartments: action.apartments || ([] as Array<IApartmentRow>),
        ...(action.totalApartments && { totalApartments: action.totalApartments }),
        loading: false,
      };
    }
    case ApartmentActionTypes.SET_FILTERED_APARTMENTS: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        loading: false,
      };
    }
    case ApartmentActionTypes.ADD_APARTMENT: {
      const apartments =
        state.apartments.length === 10
          ? state.apartments
          : [...state.apartments, action.apartment];
      return {
        ...state,
        apartments,
        totalApartments: state.totalApartments + 1,
      };
    }
    case ApartmentActionTypes.UPDATE_APARTMENT: {
      const selectedApartmentIndex =
        state.apartments.findIndex((apartment) => apartment.id === action.apartment.id) ??
        0;
      const apartments = [...state.apartments];
      apartments.splice(selectedApartmentIndex, 1);
      apartments.splice(selectedApartmentIndex, 0, action.apartment);
      return { ...state, apartments };
    }
    case ApartmentActionTypes.DELETE_APARTMENT: {
      return {
        ...state,
        apartments:
          state.apartments.filter((apartment) => apartment.id !== action.apartment.id) ??
          state.apartments,
      };
    }
    case ApartmentActionTypes.DELETE_SELECTED_APARTMENTS: {
      return state;
    }
    case ApartmentActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case ApartmentActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case ApartmentActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
