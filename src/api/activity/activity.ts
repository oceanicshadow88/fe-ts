import axios from 'axios';
import config from '../../config/config';

export function getActivity(ticketId = '') {
  return axios.get(`${config.apiAddressV2}/activities/${ticketId}`);
}

export function deleteActivity(ticketId = '') {
  return axios.delete(`${config.apiAddressV2}/activities/${ticketId}`);
}
