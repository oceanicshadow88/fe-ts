/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import config from './config';
import { IDailyScrumTicket } from '../types';

const errorStatusHandlers = {
  default: () => toast.error('Server error, please contact admin')
};

/// //////////////////////////////////////////////////////////////////////////////
const alphaApiV2 = axios.create({
  baseURL: config.apiAddressV2,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

alphaApiV2.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
  if (!axiosConfig.headers) {
    console.error('Cannot find header');
    return axiosConfig;
  }
  const token = localStorage.getItem('access_token');
  if (!token) {
    return Promise.reject(new Error('alphaApiV2 No access token'));
  }
  axiosConfig.headers.Authorization = `Bearer ${token}`;
  axiosConfig.headers['Content-Type'] = 'application/json';
  return axiosConfig;
});

alphaApiV2.interceptors.response.use(
  (response) => response,
  () => {
    errorStatusHandlers.default();
  }
);

/// //////////////////////////////////////////////////////////////////////////////
const kScrum: AxiosInstance = axios.create({
  baseURL: `${config.kScrumAddress}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

kScrum.interceptors.response.use(
  (response): IDailyScrumTicket => {
    return response.data ?? response;
  },
  (error) => {
    errorStatusHandlers.default();
    return Promise.reject(error);
  }
);
/// //////////////////////////////////////////////////////////////////////////////
const paymentApi: AxiosInstance = axios.create({
  baseURL: `${config.apiAddressV2}/payment`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

paymentApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      errorStatusHandlers.default();
    }
  }
);

const alphaApiV1 = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
});

alphaApiV1.interceptors.request.use((axiosConfig: AxiosRequestConfig) => {
  if (!axiosConfig.headers) {
    console.error('Cannot find header');
    return axiosConfig;
  }
  const token = localStorage.getItem('access_token');
  if (token) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  }
  axiosConfig.headers['Content-Type'] = 'application/json';

  return axiosConfig;
});
/// //////////////////////////////////////////////////////////////////////////////

export { alphaApiV2, kScrum, paymentApi, alphaApiV1 };
