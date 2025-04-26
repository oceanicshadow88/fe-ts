import axios from 'axios';
import RegisterForm from './entity/register';
import config from '../../config/config';

export const register = async (emailToken: string, registerForm: RegisterForm) => {
  const path = `${config.apiAddressV2}/register/${emailToken}`;
  const result = await axios.put(path, { ...registerForm });
  return result;
};
