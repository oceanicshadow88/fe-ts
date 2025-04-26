/* eslint-disable consistent-return */
import axios from 'axios';
import config from '../../config/config';
import { IChangePassword } from '../../types';

const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const changePassword = async (data: IChangePassword, token: string | undefined) => {
  if (!token) {
    return;
  }
  const path = `${config.apiAddressV2}/account/change-password`;
  const result = await axios.patch(path, data, getAuthHeader(token));
  return result;
};

export default changePassword;
