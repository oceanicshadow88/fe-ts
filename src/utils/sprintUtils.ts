import { ISprint } from '../types';

export const getSprintById = (id: string, projectDetails: any) => {
  const result = projectDetails.sprints.find((item) => item.id === id);
  if (!result) {
    return null;
  }
  return result;
};

export const getNormalizedSprintId = (sprint: string | ISprint | null | undefined): string => {
  if (!sprint) return 'backlog';
  if (typeof sprint === 'string') return sprint;
  return sprint.id;
};
