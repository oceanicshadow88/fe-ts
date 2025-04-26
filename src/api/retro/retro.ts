import { alphaApiV2 } from '../../config/api';

export const getSprintRetroItems = (sprintId: string) => {
  return alphaApiV2.get(`/sprints/${sprintId}/retro/items`);
};

export const getRetroBoards = (sprintId: string) => {
  return alphaApiV2.get(`/sprints/${sprintId}/retro`);
};

export const createRetroItem = (sprintId: string, data: any) => {
  return alphaApiV2.post(`/sprints/${sprintId}/retro/items`, data);
};

export const deleteRetroItem = (id: string) => {
  return alphaApiV2.delete(`/retro/items/${id}`);
};

export const updateRetroStatus = (id: string, status: any) => {
  return alphaApiV2.put(`/retro/items/${id}`, { status });
};
