import React from 'react';
import styles from './BacklogSection.module.scss';

interface IUnassignedTicketsSection {
  title?: string;
  totalIssue: number;
  children?: React.ReactNode | string;
}

export default function UnassignedTicketsSection({
  title = 'Backlogs',
  totalIssue,
  children
}: IUnassignedTicketsSection) {
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
