import axios, { AxiosRequestConfig } from "axios";
import { LocalStorageKeys } from "../../interfaces";


export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const authToken = localStorage.getItem(LocalStorageKeys.AuthToken);
        config.headers = {
            ...config.headers,
            ...(authToken ? { Autherization: `Bearer ${authToken}`} : {})
        } as AxiosRequestConfig['headers'];

        return config;
    },
    (error) => {
        console.warn(error);
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    async (response) => {
        const authToken = response.headers.auth;
        if (authToken) localStorage.setItem(LocalStorageKeys.AuthToken, authToken);
        return response;
    },
    (error) => {
        const status = error?.response?.status || error?.status;
        const errorMessage = error?.response?.data?.messages?.[0] ?? error.message;
        if(status === 401) {
            // unauthorized
        }
        console.error(errorMessage);

        return Promise.reject(error)
    }
)

export default axiosInstance;