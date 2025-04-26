import React from 'react';
import Button from '../../../../Form/Button/Button';
import styles from './TicketStatusBtn.module.scss';

export interface ITicketStatusBtnProps {
  status: string;
  onClick?: () => void;
  overrideStyle?: string;
  children?: React.ReactNode | string;
}

const statusStyles = {
  'TO DO': styles.ticketStatusBtnToDO,
  DONE: styles.ticketStatusBtnDone,
  'IN PROGRESS': styles.ticketStatusBtn,
  REVIEW: styles.ticketStatusBtn,
  BACKLOG: styles.ticketStatusBtn,
  'SELECT STATUS': styles.ticketStatusSelect
};

export default function TicketStatusBtn({
  status,
  onClick,
  overrideStyle,
  children
}: ITicketStatusBtnProps) {
  const buttonStyle = overrideStyle || statusStyles[status.toUpperCase()] || styles.ticketStatusBtn;

  return (
    <Button overrideStyle={buttonStyle} onClick={onClick}>
      {children || status.toUpperCase()}
    </Button>
  );
}
