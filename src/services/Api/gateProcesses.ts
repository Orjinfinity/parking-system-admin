import axiosInstance from '../Axios/AxiosInstance';
import { IGateProces } from '../../interfaces';
import { END_POINTS } from '../../consts';

const getGateProcesses = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.GATE_PROCESSES.gateProcesses}?page=${page}&size=${size}`);

const getGateProcesById = (gateProcesId: number) =>
  axiosInstance.get(`${END_POINTS.GATE_PROCESSES.gateProcesses}/${gateProcesId}`);

const addGateProces = (payload: any) =>
  axiosInstance.post(`${END_POINTS.GATE_PROCESSES.gateProcesses}`, payload);

const updateGateProces = (gateProcesId: number, payload: IGateProces) =>
  axiosInstance.put(`${END_POINTS.GATE_PROCESSES.gateProcesses}/${gateProcesId}`, payload);

const deleteGateProces = (gateProcesId: number) =>
  axiosInstance.delete(`${END_POINTS.GATE_PROCESSES.gateProcesses}/${gateProcesId}`);

export { getGateProcesses, getGateProcesById, addGateProces, updateGateProces, deleteGateProces };
