import axios from 'axios';
import config from '../../config/config';

export const getMembers = async (projectId: string) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/members`;
  const res = await axios.get(path);
  return res;
};

export const inviteMember = async (email: string, roleId: string, projectId: string) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/members/invite`;
  const res = await axios.post(path, { roleId, email });
  return res;
};

export const updateMemberRole = async (roleId: string, userId: string, projectId: string) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/members/${userId}`;
  const res = await axios.put(path, { roleId });
  return res;
};

export const removeMember = async (userId: string, projectId: string) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/members/${userId}`;

  const res = await axios.delete(path);
  return res;
};
