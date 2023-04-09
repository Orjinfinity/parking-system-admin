import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { DoorActionTypes, IDoorAction } from './Types';
import { getDoors, getDoorsByApartmentId } from '../../services';
import { doorReducer } from './Reducer';
import { IDoorRow } from '../../consts';
import { getApartmentIdForAdmin, getUserIsApartmentAdmin } from '../../utils/userHelper';

export interface IDoorState {
  doors: IDoorRow[];
  filter: {
    key: string;
    result: IDoorRow[];
  };
  page: number;
  totalDoors: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: IDoorState = {
  doors: [] as IDoorRow[],
  filter: {
    key: '',
    result: [] as IDoorRow[],
  },
  page: 0,
  totalDoors: 0,
  perPageRows: 10,
  loading: false,
};

interface IDoorContext {
  state: IDoorState;
  dispatch: Dispatch<IDoorAction>;
}

const DoorContext = createContext<IDoorContext>({
  state: {
    doors: [] as IDoorRow[],
    filter: {
      key: '',
      result: [] as IDoorRow[],
    },
    page: 0,
    totalDoors: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const DoorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doorReducer, initialState);
  const isApartmentAdmin = getUserIsApartmentAdmin();

  useEffect(() => {
    const apartmentInfo = getApartmentIdForAdmin();
    const fetchDoors = async () => {
      try {
        const doorsEndpoint = isApartmentAdmin ? getDoorsByApartmentId : getDoors;
        dispatch({ type: DoorActionTypes.SET_LOADING, loading: true });
        const response = await doorsEndpoint(state.page, state.perPageRows, apartmentInfo?.id);
        const data = await response.data;
        const totalDoors = data.totalItems as number;
        let doors: IDoorRow[] = data.resultData;
        doors = doors.map((door) => ({
          ...door,
          created_at: new Date(door.created_at).toLocaleString(),
        }));
        dispatch({ type: DoorActionTypes.SET_DOORS, doors, totalDoors });
      } catch (error) {
        dispatch({ type: DoorActionTypes.SET_LOADING, loading: false })
      }
    };

    fetchDoors().catch((_) =>
      dispatch({ type: DoorActionTypes.SET_LOADING, loading: false })
    );
  }, [state.page, state.perPageRows, isApartmentAdmin]);

  return (
    <DoorContext.Provider value={{ state, dispatch }}>
      {children}
    </DoorContext.Provider>
  );
};

export { DoorContext, DoorContextProvider };
