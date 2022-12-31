import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { IApartment } from '../../interfaces';

const getApartments = (page: number, size: number = 10) =>
  axiosInstance.get(
    `${END_POINTS.APARTMENTS.apartments}?page=${page}&size=${size}`
  );

const getApartmentById = (apartmentId: number) =>
  axiosInstance.get(`${END_POINTS.APARTMENTS.apartments}/${apartmentId}`);

const addApartment = (payload: IApartment) =>
  axiosInstance.post(`${END_POINTS.APARTMENTS.apartments}`, payload);

const updateApartment = (apartmentId: number, payload: IApartment) =>
  axiosInstance.put(
    `${END_POINTS.APARTMENTS.apartments}/${apartmentId}`,
    payload
  );

const deleteApartment = (apartmentId: number) =>
  axiosInstance.delete(`${END_POINTS.APARTMENTS.apartments}/${apartmentId}`);

export {
  getApartments,
  getApartmentById,
  addApartment,
  updateApartment,
  deleteApartment,
};
