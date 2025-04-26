export interface CreateComment {
  ticketId: string;
  sender: string;
  content: string;
}

export interface UpdateComment {
  commitId: string;

  content: string;
}
