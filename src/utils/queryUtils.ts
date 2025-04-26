export const buildSearchTicketQuery = (data: any) => {
  if (!data) {
    return '';
  }
  const searchQuery: any = [];
  const { title, labelIds, ticketTypesIds, ticketEpicsIds, userIds } = data;
  if (title) {
    searchQuery.push(`title=${title}`);
  }
  if (labelIds) {
    searchQuery.push(`labels=${labelIds.join(',')}`);
  }
  if (ticketTypesIds) {
    searchQuery.push(`ticketTypes=${ticketTypesIds.join(',')}`);
  }
  if (ticketEpicsIds) {
    searchQuery.push(`ticketEpics=${ticketEpicsIds.join(',')}`);
  }
  if (userIds) {
    searchQuery.push(`users=${userIds.join(',')}`);
  }

  return searchQuery.length > 0 ? `?${searchQuery.join('&')}` : '';
};
