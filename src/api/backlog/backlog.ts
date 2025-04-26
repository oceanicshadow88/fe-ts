import axios from 'axios';
import config from '../../config/config';
import { buildSearchTicketQuery } from '../../utils/queryUtils';

// eslint-disable-next-line import/prefer-default-export
export const getBacklogTickets = async (projectId: string, searchQuery?: any) => {
  const path = `${config.apiAddressV2}/projects/${projectId}/backlogs${buildSearchTicketQuery(
    searchQuery
  )}`;
  const response = await axios.get(path);
  return response.data ?? [];
};

export const filterBacklog = async (
  projectId: string,
  input: string,
  users: string,
  types: string,
  labels: string
) => {
  let inputSearchCase = input;
  let userSearchCase = users;
  let typeSearchCase = types;
  let labelSearchCase = labels;

  enum Cases {
    searchAll = 'all'
  }

  if (input === '') {
    inputSearchCase = Cases.searchAll;
  }
  if (users === '') {
    userSearchCase = Cases.searchAll;
  }
  if (types === '') {
    typeSearchCase = Cases.searchAll;
  }
  if (labels === '') {
    labelSearchCase = Cases.searchAll;
  }
  const path = `${config.apiAddressV2}/projects/${projectId}/backlogs/${inputSearchCase}/${userSearchCase}/${typeSearchCase}/${labelSearchCase}`;
  const response = await axios.get(path);
  return response.data;
};
