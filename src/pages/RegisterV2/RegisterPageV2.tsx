import React from 'react';
import VerifyPageBackground from '../VerifyPage/VerifyPageBackground/VerifyPageBackground';
import RegisterMainV2 from './RegisterMainV2/RegisterMainV2';
import styles from './RegisterPageV2.module.scss';

export default function RegisterPageV2() {
  return (
    <div className={styles.registerContainer}>
      <VerifyPageBackground>
        <RegisterMainV2 />
      </VerifyPageBackground>
    </div>
  );
}
