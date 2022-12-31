import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { IRegisterProps } from './auth';

interface IAddUser extends IRegisterProps {
  brand: string;
}

interface IUpdateUser extends IRegisterProps {
  id: number;
  brand: string;
}

const getUsers = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.USERS.users}?page=${page}&size=${size}`);

const getUserById = (userId: number) =>
  axiosInstance.get(`${END_POINTS.USERS.users}/${userId}`);

const addUser = (payload: IAddUser) =>
  axiosInstance.post(`${END_POINTS.USERS.users}`, payload);

const updateUser = (userId: number, payload: IUpdateUser) =>
  axiosInstance.put(`${END_POINTS.USERS.users}/${userId}`, payload);

const deleteUser = (userId: number) =>
  axiosInstance.delete(`${END_POINTS.USERS.users}/${userId}`);

export { getUsers, getUserById, addUser, updateUser, deleteUser };
