import React from 'react';
import styles from './Faqs.module.scss';
import Questions from './FaqsQuestions';

export default function Faqs() {
  return (
    <div className={styles.faqs}>
      <div className={styles.title}>Frequently asked questions</div>
      <div className={styles.faqsContainer}>
        <Questions />
        <div className={styles.moreInfo}>
          <a href="https://support.teamwork.com/projects">More information</a>
        </div>
      </div>
    </div>
  );
}
