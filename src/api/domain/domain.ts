/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';

export function getDomains() {
  return axios.get(`${config.apiAddressV2}/domains`);
}

export function getDomainExists() {
  return axios.get(`${config.apiAddressV2}/domains/exists`);
}
