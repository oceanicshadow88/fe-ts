import React from 'react';
import styles from './LoginFooter.module.scss';

export default function LoginFooter() {
  return (
    <div className={styles.registerFooter}>
      <p className={styles.text}>One account to access TechScrum, Confluence, Trello, and more.</p>
    </div>
  );
}
