import axios from 'axios';
import config from '../../config/config';

export const userRegister = async (data) => {
  return axios.post(`${config.apiAddressV2}/register`, data);
};
