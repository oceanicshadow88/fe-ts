import React from 'react';
import styles from './EmailSection.module.scss';
import InputEmail from '../InputEmail/InputEmail';
import ButtonGetStart from '../ButtonGetStart/ButtonGetStart';

function EmailSection() {
  return (
    <div className={styles.container}>
      <div className={styles.emailSection}>
        <div className={styles.wrapper}>
          <h3 className={styles.header}>
            Save one day every week with
            <br />
            TechScrum&apos;s Board view.
          </h3>
          <div className={styles.form}>
            <InputEmail />
            <ButtonGetStart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailSection;
