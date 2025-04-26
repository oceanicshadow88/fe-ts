import axios from 'axios';
import config from '../../config/config';

export function getUserInfo(token: string, refreshToken: string) {
  const configHeader = {
    headers: {
      Authorization: `Bearer ${token ?? ''} ${refreshToken ?? ''}`
    }
  };
  return axios.post(`${config.apiAddressV2}/auto-fetch-userInfo`, {}, configHeader);
}

export function anotherProfileFunction() {
  return true;
}
