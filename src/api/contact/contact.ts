import axios from 'axios';
import { EmailData } from './entity/emailData';
import config from '../../config/config';

export async function sendEmail(data: EmailData) {
  const path = `${config.apiAddressV2}/emailus`;
  const result = await axios.post(path, data);
  return result;
}
