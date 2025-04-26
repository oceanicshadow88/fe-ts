import React from 'react';
import styles from './Description.module.scss';

export default function Description() {
  return (
    <div className={styles.content}>
      <h1>Get Started with TechScrum</h1>
      <p>
        <span>
          Start working together beautifully. See how TechScrum can help your team with our 30-day
          free trial.
        </span>
      </p>
    </div>
  );
}
