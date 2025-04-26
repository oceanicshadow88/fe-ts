import React from 'react';
import styles from './MainContent.module.scss';
import Faqs from './Faqs/Faqs';
import Contact from './Contact/Contact';

export default function MainContent() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.container}>
            <h1>TechScrum Support Center</h1>
            <hr className={styles.underline} />
            <p>Email or Live chat, no matter which medium you prefer, we are here to help</p>
            <p>Check out our product specific help docs or contact us using the form below</p>
          </div>
        </div>
        <Faqs />
        <Contact />
      </div>
    </div>
  );
}
