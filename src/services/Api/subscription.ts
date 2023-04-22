import axiosInstance from '../Axios/AxiosInstance';
import { END_POINTS } from '../../consts';
import { ISubscribe } from '../../interfaces';

const addSubscribe = (payload: ISubscribe) =>
  axiosInstance.post(`${END_POINTS.SUBSCRIBE.subscription}`, payload);

export { addSubscribe };
