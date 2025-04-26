import React from 'react';
import styles from './Teamwork.module.scss';

export default function Teamwork() {
  return (
    <div className={styles.teamworkContainer}>
      <div className={styles.background} />
      <div className={styles.descButtonContainer}>
        <div className={styles.desc}>
          <h3 className={styles.heading}>Get started with Teamwork</h3>
          <p className={styles.subheading}>
            Start working together beautifully. See how Teamwork can help your team with our 30-day
            free trial.
          </p>
        </div>
        <div className={styles.linkButtonContainer}>
          <button className={`${styles.whiteBackground} ${styles.linkButton}`}>
            Try Teamwork for free
          </button>
          <button className={styles.linkButton}>Join a webinar</button>
          <button className={styles.linkButton}>Get in touch</button>
        </div>
      </div>
    </div>
  );
}
