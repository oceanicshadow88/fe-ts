import { alphaApiV2 } from '../../config/api';
import { IDashboard, IDashBoardDailyScrum } from '../../types';

interface IPDFReportContent {
  role: string;
  content: string;
}

export const getDashBoardData = async (projectId: string, userId: string): Promise<IDashboard> => {
  const res = await alphaApiV2.get(`/projects/${projectId}/dashboards`, {
    params: {
      userId
    }
  });
  return res.data;
};

export const getDashBoardDailyScrums = (
  projectId: string,
  userId: string
): Promise<IDashBoardDailyScrum[]> => {
  return alphaApiV2.get(`/${projectId}/dashboards/dailyScrums`, {
    params: {
      userId
    }
  });
};

export const getPDFReportContent = (projectId: string): Promise<IPDFReportContent> => {
  return alphaApiV2.get(`/${projectId}/dashboards/reports`);
};

export const getStatusSummary = (projectId: string) => {
  return alphaApiV2.get(`/tickets/project/${projectId}/statusSummary`);
};
