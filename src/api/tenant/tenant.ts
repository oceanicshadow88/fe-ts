/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export function isOwner(userId: string) {
  return axios.get(`${config.apiAddressV2}/tenants/owner`, { params: { userId } });
}
