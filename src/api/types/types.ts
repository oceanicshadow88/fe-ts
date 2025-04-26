import axios from 'axios';
import config from '../../config/config';

// eslint-disable-next-line import/prefer-default-export
export const getTypes = async () => {
  const path = `${config.apiAddressV2}/types`;
  const response = await axios.get(path);
  return response.data;
};
