import { IBlockRow } from '../../consts';
import { IBlockState, initialState } from './BlockContext';
import { BlockActionTypes, IBlockAction } from './Types';

export const blockReducer = (
  state: IBlockState,
  action: IBlockAction
): typeof initialState => {
  switch (action.type) {
    case BlockActionTypes.SET_BLOCKS: {
      return {
        ...state,
        blocks: action.blocks || ([] as Array<IBlockRow>),
        ...(action.totalBlocks && { totalBlocks: action.totalBlocks }),
        loading: false,
      };
    }
    case BlockActionTypes.SET_FILTERED_BLOCKS: {
      return {
        ...state,
        filter: {
          key: action.filter.key,
          result: action.filter.result,
        },
        loading: false,
      };
    }
    case BlockActionTypes.ADD_BLOCK: {
      const blocks =
        state.blocks.length === 10
          ? state.blocks
          : [...state.blocks, action.block];
      return {
        ...state,
        blocks,
        totalBlocks: state.totalBlocks + 1,
      };
    }
    case BlockActionTypes.UPDATE_BLOCK: {
      console.log('block', action)
      const selectedBlockIndex =
        state.blocks.findIndex((block) => block.id === action.block.id) ??
        0;
      const blocks = [...state.blocks];
      blocks.splice(selectedBlockIndex, 1);
      blocks.splice(selectedBlockIndex, 0, action.block);
      return { ...state, blocks };
    }
    case BlockActionTypes.DELETE_BLOCK: {
      return {
        ...state,
        blocks:
          state.blocks.filter((block) => block.id !== action.block.id) ??
          state.blocks,
      };
    }
    case BlockActionTypes.DELETE_SELECTED_BLOCKS: {
      return state;
    }
    case BlockActionTypes.SET_LOADING: {
      return { ...state, loading: action?.loading };
    }
    case BlockActionTypes.UPDATE_PAGE_COUNT: {
      return { ...state, page: action?.page || 0 };
    }
    case BlockActionTypes.UPDATE_PER_PAGE_ROWS: {
      return { ...state, perPageRows: action?.perPageRows || 10 };
    }
    default:
      return state;
  }
};
