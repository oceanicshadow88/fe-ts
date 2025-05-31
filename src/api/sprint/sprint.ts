/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import config from '../../config/config';

export const createSprint = async (data: object) => {
  const response = await axios.post(`${config.apiAddressV2}/sprints`, data);
  return response.data;
};

export const updateSprint = async (id: string, data: object) => {
  const response = await axios.put(`${config.apiAddressV2}/sprints/${id}`, data);
  return response.data;
};

export const deleteSprint = async (id: string) => {
  const response = await axios.delete(`${config.apiAddressV2}/sprints/${id}`);
  return response.data;
};

export const getLatestSprint = async (projectId: string) => {
  const response = await axios.get(`${config.apiAddressV2}/projects/${projectId}/sprints/current`);
  return response.data;
};
