import axios from 'axios';

import config from '../../config/config';

import { CreateComment } from './entity/comment';

export function getComment(senderId = 'abc') {
  return axios.get(`${config.apiAddressV2}/comments/${senderId}`);
}

export function createComment(data: CreateComment) {
  return axios.post(`${config.apiAddressV2}/comments`, data);
}

export function updateComment(id: string, content: string) {
  return axios.put(`${config.apiAddressV2}/comments/${id}`, { content });
}

export function deleteComment(id: string) {
  return axios.delete(`${config.apiAddressV2}/comments/${id}`);
}
