import { AxiosResponse } from 'axios';
import { IDailyScrumTicket } from '../../types';
import { kScrum } from '../../config/api';

export const getDailyScrums = (projectId: string, userId: string): Promise<IDailyScrumTicket[]> => {
  return kScrum.get(`/projects/${projectId}/dailyScrums`, {
    params: {
      userId
    }
  });
};

export const upsertDailyScrum = (
  projectId: string,
  data: {
    reportDate?: Date;
    needSupport: boolean;
    canCompleteSprint: boolean;
    sprintId: string;
    tenantId: string;
    accessKey: string;
    feedback: string;
  }
): Promise<AxiosResponse<IDailyScrumTicket>> => {
  return kScrum.post(`/projects/${projectId}/daily-standup`, data);
};

export const updateDailyScrum = async (
  projectId: string,
  dailyScrumsId: string,
  data: Partial<IDailyScrumTicket>
) => {
  return kScrum.patch(`/projects/${projectId}/dailyScrums/${dailyScrumsId}`, data);
};

export const deleteDailyScrum = async (projectId: string, ticketId: string) => {
  return kScrum.delete(`/projects/${projectId}/dailyScrums`, {
    params: {
      ticketId
    }
  });
};

export const getDailyData = async (
  projectId: string,
  date: string,
  sprintId: string,
  tenantId: string,
  userId: string
) => {
  return kScrum.get(
    `/projects/${projectId}/daily-standup?date=${date}&sprintId=${sprintId}&tenantId=${tenantId}&accessKey=${userId}`
  );
};

export const getDailyOptions = () => {
  return kScrum.get(`/daily-standup/options`);
};
