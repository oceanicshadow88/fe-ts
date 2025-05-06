import axios from 'axios';
import config from '../../config/config';

export function importProjects(data: FormData, fileSize: number) {
  const url =
    fileSize > 10 * 1024 * 1024
      ? `${config.apiAddressV2}/import-project/large`
      : `${config.apiAddressV2}/import-project/`;
  return axios.post(url, data);
}
