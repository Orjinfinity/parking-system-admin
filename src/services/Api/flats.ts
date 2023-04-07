import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { IFlat } from '../../interfaces';

const getFlats = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.FLATS.flats}?page=${page}&size=${size}`);

const getFlatsByBlockId = (blockId: number) =>
  axiosInstance.get(`${END_POINTS.FLATS.flats}?blockId=${blockId}`);

const getFlatById = (flatId: number) =>
  axiosInstance.get(`${END_POINTS.FLATS.flats}/${flatId}`);

const addFlat = (payload: IFlat) =>
  axiosInstance.post(`${END_POINTS.FLATS.flats}`, payload);

const updateFlat = (flatId: number, payload: IFlat) =>
  axiosInstance.put(`${END_POINTS.FLATS.flats}/${flatId}`, payload);

const deleteFlat = (flatId: number) =>
  axiosInstance.delete(`${END_POINTS.FLATS.flats}/${flatId}`);

export { getFlats, getFlatsByBlockId, getFlatById, addFlat, updateFlat, deleteFlat };
