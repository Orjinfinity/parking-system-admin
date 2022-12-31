import axios, { AxiosRequestConfig } from 'axios';
import { LocalStorageKeys } from '../../interfaces';
import { errorMessage } from '../Toast/Toast';

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authToken = localStorage.getItem(LocalStorageKeys.AuthToken);
    config.headers = {
      ...config.headers,
      ...(authToken ? { Autherization: `Bearer ${authToken}` } : {}),
    } as AxiosRequestConfig['headers'];

    return config;
  },
  (error) => {
    console.warn(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    const authToken = response.headers.auth;
    if (authToken) localStorage.setItem(LocalStorageKeys.AuthToken, authToken);
    return response;
  },
  (error) => {
    const status = error?.response?.status || error?.status;
    const message = error?.response?.data?.message ?? error.message;

    if (message) errorMessage(message);
    if (status === 401 && !message)
      errorMessage(
        `${error?.response?.status}: ${error?.response?.statusText}`
      );

    return Promise.reject(error);
  }
);

export default axiosInstance;
