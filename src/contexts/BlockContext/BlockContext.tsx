import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { BlockActionTypes, IBlockAction } from './Types';
import { getBlocks } from '../../services';
import { IBlockRow } from '../../consts';
import { blockReducer } from './Reducer';

export interface IBlockState {
  blocks: IBlockRow[];
  filter: {
    key: string;
    result: IBlockRow[];
  };
  page: number;
  totalBlocks: number;
  perPageRows: number;
  loading: boolean;
}

export const initialState: IBlockState = {
  blocks: [] as IBlockRow[],
  filter: {
    key: '',
    result: [] as IBlockRow[],
  },
  page: 0,
  totalBlocks: 0,
  perPageRows: 10,
  loading: false,
};

interface IBlockContext {
  state: IBlockState;
  dispatch: Dispatch<IBlockAction>;
}

const BlockContext = createContext<IBlockContext>({
  state: {
    blocks: [] as IBlockRow[],
    filter: {
      key: '',
      result: [] as IBlockRow[],
    },
    page: 0,
    totalBlocks: 0,
    perPageRows: 10,
    loading: false,
  },
  dispatch: () => {},
});

const BlockContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blockReducer, initialState);

  useEffect(() => {
    const fetchBlocks = async () => {
      dispatch({ type: BlockActionTypes.SET_LOADING, loading: true });
      const response = await getBlocks(state.page, state.perPageRows);
      const data = await response.data;
      const totalBlocks = data.totalItems as number;
      let blocks: IBlockRow[] = data.resultData;
      blocks = blocks.map((block) => ({
        ...block,
        created_at: new Date(block.created_at).toLocaleString(),
      }));
      dispatch({ type: BlockActionTypes.SET_BLOCKS, blocks, totalBlocks });
    };

    fetchBlocks().catch((_) =>
      dispatch({ type: BlockActionTypes.SET_LOADING, loading: false })
    );
  }, [state.page, state.perPageRows]);

  return (
    <BlockContext.Provider value={{ state, dispatch }}>
      {children}
    </BlockContext.Provider>
  );
};

export { BlockContext, BlockContextProvider };
