/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';
import { buildSearchTicketQuery } from '../../utils/queryUtils';

export const getBoard = async (
  id: string,
  input: string,
  users: string,
  ticketTypes: string,
  labels: string
) => {
  let inputSearchCase = input;
  let userSearchCase = users;
  let ticketTypeSearchCase = ticketTypes;
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
  if (ticketTypes === '') {
    ticketTypeSearchCase = Cases.searchAll;
  }
  if (labels === '') {
    labelSearchCase = Cases.searchAll;
  }
  const path = `${config.apiAddressV2}/board/${id}/${inputSearchCase}/${userSearchCase}/${ticketTypeSearchCase}/${labelSearchCase}`;
  const result = await axios.get(path);
  return result.data;
};

export const getSprintTickets = async (id: string, filterData: any) => {
  const path = `${config.apiAddressV2}/sprints/${id}/tickets${buildSearchTicketQuery(filterData)}`;
  const result = await axios.get(path);
  return result.data;
};

export function getBoardDetails(boardId: string) {
  return axios.get(`${config.apiAddressV2}/board/${boardId}`);
}
