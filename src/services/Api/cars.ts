import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { ICar } from '../../interfaces';

const getCars = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.CARS.cars}?page=${page}&size=${size}`);

const getCarById = (carId: number) =>
  axiosInstance.get(`${END_POINTS.CARS.cars}/${carId}`);

const addCar = (payload: ICar) =>
  axiosInstance.post(`${END_POINTS.CARS.cars}`, payload);

const updateCar = (carId: number, payload: ICar) =>
  axiosInstance.put(`${END_POINTS.CARS.cars}/${carId}`, payload);

const deleteCar = (carId: number) =>
  axiosInstance.delete(`${END_POINTS.CARS.cars}/${carId}`);

export { getCars, getCarById, addCar, updateCar, deleteCar };
