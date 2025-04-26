import axios from 'axios';
import config from '../../config/config';

// eslint-disable-next-line import/prefer-default-export
export const getStatuses = async (projectId: string) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/statuses`;
  const response = await axios.get(path);
  return response.data;
};
