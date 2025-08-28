import { ITicketBasic } from '../types';
import { generateKeyBetween } from './lexoRank';

export const getNewGlobalRank = (
  destinationIndex: number,
  allTicketsSorted: ITicketBasic[],
  destinationTickets: ITicketBasic[]
): string => {
  const lastTicketInColumnIndex = destinationTickets.length - 1;
  const lastTicketGlobalIndex = allTicketsSorted.length - 1;
  if (lastTicketGlobalIndex < 0) {
    return generateKeyBetween(null, null);
  }
  const nextTicketInColumn =
    lastTicketInColumnIndex >= destinationIndex ? destinationTickets[destinationIndex] : undefined;

  let prev: string | null = null;
  let after: string | null = null;
  if (nextTicketInColumn) {
    // find the most nearest ticket that smaller than this nextTicketInColumn
    const nextTicketInColumnGlobalIndex = allTicketsSorted.findIndex(
      (ticket) => ticket.rank === nextTicketInColumn.rank
    );
    if (nextTicketInColumnGlobalIndex !== undefined) {
      after = nextTicketInColumn.rank ?? null;
      if (nextTicketInColumnGlobalIndex - 1 >= 0) {
        const nearestSmallerRankTicket = allTicketsSorted[nextTicketInColumnGlobalIndex - 1];
        prev = nearestSmallerRankTicket.rank ?? null;
      }
    }
  } else {
    // get the greatest rank
    const greatestRankTicket = allTicketsSorted[lastTicketGlobalIndex];
    prev = greatestRankTicket?.rank ?? null;
  }
  return generateKeyBetween(prev, after);
};
