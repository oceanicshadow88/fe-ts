import config from '../../config/config';
import { alphaApiV2 } from '../../config/api';

export function getTickets() {
  return alphaApiV2.get(`${config.apiAddressV2}/projects`);
}

export function getTicketsByProject(projectId: string) {
  return alphaApiV2.get(`/tickets/project/${projectId}`);
}

export function showTicket(id: string) {
  return alphaApiV2.get(`${config.apiAddressV2}/tickets/${id}`);
}

export function deleteTicket(id: string) {
  return alphaApiV2.delete(`/tickets/${id}`);
}

export function deactiveTicket(id: string) {
  return alphaApiV2.put(`/tickets/${id}/toggleActive`);
}

export function createNewTicket(data: any) {
  return alphaApiV2.post(`/tickets`, data);
}

export function fetchTicket(id: string) {
  return alphaApiV2.get(`${config.apiAddressV2}/tickets/${id}`);
}

export function updateTicket(id: string, data: any) {
  const copyData = JSON.parse(JSON.stringify(data));
  if (typeof data.assign !== 'string') {
    copyData.assign = !data.assign ? null : data.assign.id;
  }
  if (typeof data.status !== 'string') {
    copyData.status = data?.status?.id;
  }
  if (typeof data.reporter !== 'string') {
    copyData.reporter = data?.reporter?.id;
  }

  if (typeof data.type !== 'string') {
    copyData.type = data?.type?.id;
  }
  if (typeof data.project !== 'string') {
    copyData.project = data?.project?.id;
  }
  // if (typeof data.tags !== 'string') {
  //   copyData.tags = data.tags.map((item) => {
  //     return typeof item !== 'string' ? item.id : item;
  //   });
  // }

  return alphaApiV2.put(`${config.apiAddressV2}/tickets/${id}`, copyData);
}

export function updateTicketSprint(ticketId: string, sprintId?: string | null, data?: any) {
  return alphaApiV2.put(`${config.apiAddressV2}/tickets/${ticketId}`, { sprintId, ...data });
}

export function updateTicketEpic(ticketId: string, epic?: string | null) {
  return alphaApiV2.put(`${config.apiAddressV2}/tickets/${ticketId}`, { epic });
}

export function updateTicketStatus(ticketId: string, statusId: string) {
  return alphaApiV2.put(`${config.apiAddressV2}/tickets/${ticketId}`, { status: statusId });
}

export function removeTicket(id: string) {
  return alphaApiV2.delete(`${config.apiAddressV2}/tickets/${id}`);
}
