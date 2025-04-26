import React from 'react';
import styles from './VerifyPageV2.module.scss';
import VerifyPageBackground from './VerifyPageBackground/VerifyPageBackground';
import VerifyPageMainV2 from './VerifyPageMain/VerifyPageMainV2';

export default function VerifyPageV2() {
  return (
    <div className={styles.registerContainer}>
      <VerifyPageBackground>
        <VerifyPageMainV2 />
      </VerifyPageBackground>
    </div>
  );
}
