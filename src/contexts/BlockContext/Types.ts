import { IBlockRow } from "../../consts";

interface IBlockActionPayload {
  page: number;
  block: IBlockRow;
  blocks: Array<IBlockRow>;
  filter: {
    key: string;
    result: Array<IBlockRow>;
  }
  totalBlocks: number;
  deleteBlocks: Array<IBlockRow>;
  perPageRows: number;
  loading: boolean;
}

export enum BlockActionTypes {
  ADD_BLOCK = 'ADD_BLOCK',
  SET_BLOCKS = 'SET_BLOCKS',
  SET_FILTERED_BLOCKS = 'SET_FILTERED_BLOCKS',
  UPDATE_BLOCK = 'UPDATE_BLOCK',
  DELETE_BLOCK = 'DELETE_BLOCK',
  SET_LOADING = 'SET_LOADING',
  UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT',
  UPDATE_PER_PAGE_ROWS = 'UPDATE_PER_PAGE_ROWS',
  DELETE_SELECTED_BLOCKS = 'DELETE_SELECTED_BLOCKS',
}

export interface IBlockAction extends Partial<IBlockActionPayload> {
  type: BlockActionTypes;
}