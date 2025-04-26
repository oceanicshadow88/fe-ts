import React from 'react';
import TimeAgo from 'react-timeago';
import { format, differenceInDays, differenceInSeconds } from 'date-fns';

interface TimeAgoProps {
  date: string | Date;
  className?: string;
}

function CustomTimeAgo({ date, className }: TimeAgoProps) {
  const now = new Date();
  const commentDate = new Date(date);
  const diffInDays = differenceInDays(now, commentDate);
  const diffInSeconds = differenceInSeconds(now, commentDate);

  if (diffInSeconds < 60) {
    return <span className={className}>Just now</span>;
  }
  if (diffInDays > 1) {
    return <span className={className}>{format(commentDate, "MMM d, yyyy 'at' hh:mm a")}</span>;
  }
  return <TimeAgo date={commentDate} className={className} />;
}

export default CustomTimeAgo;
