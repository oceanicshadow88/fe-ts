import axios from 'axios';
import config from '../../config/config';
import { IShortcutData } from '../../types';

export function getShortcuts() {
  return axios.get(`${config.apiAddressV2}/shortcuts`);
}

export function showShortcut(id: string) {
  return axios.get(`${config.apiAddressV2}/shortcuts/${id}`);
}

export function updateShortcut(projectId: string, shortcutId: string, data: IShortcutData) {
  return axios.put(`${config.apiAddressV2}/projects/${projectId}/shortcuts/${shortcutId}`, data);
}

export function createShortcut(projectId: string, data: IShortcutData) {
  return axios.post(`${config.apiAddressV2}/projects/${projectId}/shortcuts`, data);
}

export function deleteShortcut(projectId: string, shortcutId: string) {
  return axios.delete(`${config.apiAddressV2}/projects/${projectId}/shortcuts/${shortcutId}`);
}
