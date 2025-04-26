import React from 'react';
import styles from './Top.module.scss';

export default function Top() {
  return (
    <div className={styles.topContainer}>
      <h1 className={styles.heading}>Security at Teamwork</h1>
      <p className={styles.para}>
        We’re privileged to be trusted by thousands of companies in over 140 countries worldwide.
      </p>
      <svg className={styles.blueRec}>
        <rect className={styles.blue} width="10" height="10" />
      </svg>
      <svg className={styles.yellowRec}>
        <rect className={styles.yellow} width="10" height="10" />
      </svg>
      <svg className={styles.pinkCir}>
        <circle className={styles.pink} cx="10" cy="10" r="5" />
      </svg>
    </div>
  );
}
