/* eslint-disable consistent-return */
import { alphaApiV2 } from '../../config/api';
import { IProjectData } from '../../types';

export function getProjects() {
  return alphaApiV2.get(`/projects`);
}

export function showProject(id: string) {
  return alphaApiV2.get(`/projects/${id}`);
}

export function getProjectDetails(id: string) {
  return alphaApiV2.get(`/projects/${id}/details`);
}

export function createProject(data: IProjectData) {
  return alphaApiV2.post(`/projects`, data);
}

export function deleteProject(id: string) {
  return alphaApiV2.delete(`/projects/${id}`);
}

export function updateProject(id: string, data: IProjectData) {
  const copyData = JSON.parse(JSON.stringify(data));
  if (typeof data.owner !== 'string') {
    copyData.owner = !data.owner ? null : data.owner.id;
  }
  if (typeof data.projectLead !== 'string') {
    copyData.projectLead = !data.projectLead ? null : data.projectLead.id;
  }
  return alphaApiV2.put(`/projects/${id}`, copyData);
}

export function importTask(id: string) {
  return alphaApiV2.get(`/temp/projects/${id}/import`);
}
