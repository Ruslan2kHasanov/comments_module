// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { APP_BACKEND_API, LOCAL_STORAGE_TOKEN } from './consts/appConsts';
import { usersMock } from '../domain/mock/usersMock';

export const axiosWithAuthorization = axios.create({
  baseURL: APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosWithAuthorization.interceptors.request.use(
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

const mockAuth = new MockAdapter(axiosWithAuthorization, {
  delayResponse: 500,
});

const mockUnauth = new MockAdapter(axiosWithoutAuthorization, {
  delayResponse: 500,
});

usersMock(mockAuth);
usersMock(mockUnauth);
