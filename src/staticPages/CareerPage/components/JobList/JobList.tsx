import React from 'react';
import styles from './JobList.module.scss';
import JobListTable from '../JobListTable/JobListTable';

function JobList() {
  return (
    <div className={styles.jobList}>
      <div className={styles.jobListHeader}>
        <h3 className={styles.jobListTitle}>Open opportunities at Teamwork</h3>
      </div>
      <JobListTable />
    </div>
  );
}

export default JobList;
