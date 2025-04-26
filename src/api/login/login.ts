import axios from 'axios';
import { Login } from './entity/login';
import config from '../../config/config';

export default async function login(loginForm: Login) {
  const path = `${config.apiAddressV2}/login`;
  const result = await axios.post(path, { ...loginForm });
  return result;
}
