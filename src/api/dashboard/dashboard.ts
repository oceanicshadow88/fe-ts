import { alphaApiV2 } from '../../config/api';
// import {kScrum } from '../../config/api';
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

export const getDashBoardDailyScrumsByUser = (
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

// export const getDailyReport = (projectId: string, date: string, tenantId: string) => {
//   return kScrum.get(`projects/${projectId}/daily-report?reportDate=${date}&tenantId=${tenantId}`);
// };

export const getStatusSummaryBySprint = (
  projectId: string
): Promise<{ name: string; value: number }[]> => {
  return alphaApiV2.get(`/tickets/project/${projectId}/statusSummary`).then((res) => {
    return res.data.map((item: { name: string; total: number }) => ({
      name: item.name.toUpperCase(),
      value: item.total
    }));
  });
};
