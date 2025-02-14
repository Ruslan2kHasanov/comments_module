// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { APP_BACKEND_API, LOCAL_STORAGE_TOKEN } from './consts/appConsts';
import { usersMock } from '../domain/mock/usersMock';

const axiosConfig = axios.create({
  baseURL: APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const axiosWithoutAuthorization = axios.create({
  baseURL: APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const mock = new MockAdapter(axiosConfig, {
  delayResponse: 500,
});

usersMock(mock);

export default axiosConfig;
