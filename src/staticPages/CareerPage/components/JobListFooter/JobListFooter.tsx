import React from 'react';
import styles from './JobListFooter.module.scss';

function JobListFooter() {
  return (
    <div className={styles.jobListFooterContainer}>
      <h1>Come join us!</h1>
      <p>
        We&apos;re always on the lookout for exceptional talent, so even if you didn&apos;t find the
        perfect fit, we&apos;d still love to hear from you.
      </p>
      <h3>Submit a application to kitmanwork@gmail.com</h3>
    </div>
  );
}

export default JobListFooter;
