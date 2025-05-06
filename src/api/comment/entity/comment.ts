export interface CreateComment {
  ticket: string;
  sender: string;
  content: string;
}

export interface UpdateComment {
  commitId: string;

  content: string;
}
