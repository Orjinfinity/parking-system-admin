import { END_POINTS } from "../../consts";
import axiosInstance from "../Axios/AxiosInstance";

export interface ILoginProps {
    username: string;
    email: string;
    password: string;
}

export interface IRegisterProps {
    username: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
}

export interface IResetPassword {
    email: string;
    password: string;
}

export const login = (payload: ILoginProps) => axiosInstance.post(END_POINTS.AUTH.login, payload)

export const register = (payload: IRegisterProps) => axiosInstance.post(END_POINTS.AUTH.register, payload)

export const resetPassword = (payload: IResetPassword) => axiosInstance.post(END_POINTS.AUTH.resetPassword, payload)