import axios from 'axios';
import config from '../../config/config';

export function getBillInformation(data: { userId: string }) {
  axios.post(`${config.apiAddressV2}/billingOverview`, data).then((res) => {
    return res.data;
  });
}
