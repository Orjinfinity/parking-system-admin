import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { IBlock } from '../../interfaces';

const getBlocks = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.BLOCKS.blocks}?page=${page}&size=${size}`);

const getBlocksByApartmentId = (page: number, size: number = 10, apartmentId: number) =>
  axiosInstance.get(`${END_POINTS.BLOCKS.blocks}?page=${page}&size=${size}&apartmentId=${apartmentId}`);

const getAllBlocksByApartmentId = (apartmentId: number) => 
  axiosInstance.get(`${END_POINTS.BLOCKS.blocks}?apartmentId=${apartmentId}`);

const getBlockById = (blockId: number) =>
  axiosInstance.get(`${END_POINTS.BLOCKS.blocks}/${blockId}`);

const addBlock = (payload: IBlock) =>
  axiosInstance.post(`${END_POINTS.BLOCKS.blocks}`, payload);

const updateBlock = (blockId: number, payload: IBlock) =>
  axiosInstance.put(`${END_POINTS.BLOCKS.blocks}/${blockId}`, payload);

const deleteBlock = (blockId: number) =>
  axiosInstance.delete(`${END_POINTS.BLOCKS.blocks}/${blockId}`);

export { getBlocks, getBlocksByApartmentId, getAllBlocksByApartmentId, getBlockById, addBlock, updateBlock, deleteBlock };
