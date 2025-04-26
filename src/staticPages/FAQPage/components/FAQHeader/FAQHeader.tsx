import React from 'react';
import styles from './FAQHeader.module.scss';

export default function FAQHeader() {
  return (
    <header className={styles.FAQHeader}>
      <h1 className={styles.headerTitle} data-testid="header-text">
        How can we help you today?
      </h1>
      <input className={styles.searchBar} type="text" placeholder="Search" />
    </header>
  );
}
