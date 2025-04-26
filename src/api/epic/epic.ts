import { alphaApiV2 } from '../../config/api';
import config from '../../config/config';

export const createEpic = async (data: object) => {
  const response = await alphaApiV2.post(`${config.apiAddressV2}/epics`, data);
  return response.data;
};

export const updateEpic = async (id: string, data: object) => {
  const response = await alphaApiV2.put(`${config.apiAddressV2}/epics/${id}`, data);
  return response.data;
};

export const deleteEpic = async (id: string) => {
  const token = localStorage.getItem('access_token');
  const response = await alphaApiV2.delete(`${config.apiAddressV2}/epics/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
