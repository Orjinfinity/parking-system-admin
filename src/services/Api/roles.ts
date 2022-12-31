import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { IRole } from '../../interfaces';

const getRoles = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.ROLES.roles}?page=${page}&size=${size}`);

const getRoleById = (roleId: number) =>
  axiosInstance.get(`${END_POINTS.ROLES.roles}/${roleId}`);

const addRole = (payload: IRole) =>
  axiosInstance.post(`${END_POINTS.ROLES.roles}`, payload);

const updateRole = (roleId: number, payload: IRole) =>
  axiosInstance.put(`${END_POINTS.ROLES.roles}/${roleId}`, payload);

const deleteRole = (roleId: number) =>
  axiosInstance.delete(`${END_POINTS.BLOCKS.blocks}/${roleId}`);

export { getRoles, getRoleById, addRole, updateRole, deleteRole };
