import React from 'react';
import styles from './BacklogSection.module.scss';

interface IUnassignedTickets {
  title?: string;
  totalIssue: number;
  children?: React.ReactNode | string;
}

export default function UnassignedTickets({
  title = 'Backlogs',
  totalIssue,
  children
}: IUnassignedTickets) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>{title}</h1>
          <div className={styles.issueCount}>{totalIssue} tickets</div>
        </div>
      </div>
      {children}
    </section>
  );
}
