import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { IDoor } from '../../interfaces';

const getDoors = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.DOORS.doors}?page=${page}&size=${size}`);

const getDoorsByApartmentId = (page: number, size: number = 10, apartmentId: number) =>
  axiosInstance.get(`${END_POINTS.DOORS.doors}?page=${page}&size=${size}&apartmentId=${apartmentId}`);

const getDoorById = (doorId: number) =>
  axiosInstance.get(`${END_POINTS.DOORS.doors}/${doorId}`);

const addDoor = (payload: IDoor) =>
  axiosInstance.post(`${END_POINTS.DOORS.doors}`, payload);

const updateDoor = (doorId: number, payload: IDoor) =>
  axiosInstance.put(`${END_POINTS.DOORS.doors}/${doorId}`, payload);

const deleteDoor = (doorId: number) =>
  axiosInstance.delete(`${END_POINTS.DOORS.doors}/${doorId}`);

export { getDoors, getDoorsByApartmentId, getDoorById, addDoor, updateDoor, deleteDoor };
