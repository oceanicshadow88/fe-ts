import React from 'react';
import styles from './BacklogSection.module.scss';

interface IBacklogSection {
  totalIssue: number;
  children?: React.ReactNode | string;
}

export default function BacklogSection({ totalIssue, children }: IBacklogSection) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>Backlog</h1>
          <div className={styles.issueCount}>{totalIssue} tickets</div>
        </div>
      </div>
      {children}
    </section>
  );
}
