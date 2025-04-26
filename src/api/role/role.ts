import axios from 'axios';
import config from '../../config/config';

export const getRoles = async (projectId: string) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/roles`;
  const response = await axios.get(path);
  return response.data;
};

export const getRoleById = async (projectId: string, roleId: string) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/roles/${roleId}`;
  const response = await axios.get(path);
  return response.data;
};

export const addRole = async (projectId: string, roleName: string, permissions: Array<string>) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddressV2}/projects/${projectId}/roles`;
  const response = await axios.post(path, { roleName, permissions }, configHeader);
  return response.data;
};

export const updateRole = async (projectId: string, roleId: string, permissions: Array<string>) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddressV2}/projects/${projectId}/roles/${roleId}`;
  const response = await axios.put(path, { permissions }, configHeader);
  return response.data;
};

export const deleteRole = async (projectId: string, roleId: string) => {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token') ?? ''}`
    }
  };
  const path = `${config.apiAddressV2}/projects/${projectId}/roles/${roleId}`;
  const response = await axios.delete(path, configHeader);
  return response.data;
};

export const getPermissions = async () => {
  const path = `${config.apiAddressV2}/permissions`;
  const response = await axios.get(path);
  return response.data;
};
