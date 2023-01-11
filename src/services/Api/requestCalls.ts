import axiosInstance from '../Axios/AxiosInstance';
import { IRequestCall } from '../../interfaces';
import { END_POINTS } from '../../consts';

const getRequestCalls = (page: number, size: number = 10) =>
  axiosInstance.get(`${END_POINTS.REQUEST_CALLS.requestCalls}?page=${page}&size=${size}`);

const getRequestById = (requestCallId: number) =>
  axiosInstance.get(`${END_POINTS.REQUEST_CALLS.requestCalls}/${requestCallId}`);

const addRequestCall = (payload: IRequestCall) =>
  axiosInstance.post(`${END_POINTS.REQUEST_CALLS.requestCalls}`, payload);

const updateRequestCall = (requestCallId: number, payload: IRequestCall) =>
  axiosInstance.put(`${END_POINTS.REQUEST_CALLS.requestCalls}/${requestCallId}`, payload);

const deleteRequestCall = (requestCallId: number) =>
  axiosInstance.delete(`${END_POINTS.REQUEST_CALLS.requestCalls}/${requestCallId}`);

export { getRequestCalls, getRequestById, addRequestCall, updateRequestCall, deleteRequestCall };
