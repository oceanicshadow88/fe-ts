import axios from 'axios';
import config from '../../config/config';

export function importProjects(data: FormData) {
  const url = `${config.apiAddressV2}/import-project`;
  return axios.post(url, data);
}
