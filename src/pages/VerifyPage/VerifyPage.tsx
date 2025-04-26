import React from 'react';
import styles from './VerifyPage.module.scss';
import VerifyPageBackground from './VerifyPageBackground/VerifyPageBackground';
import VerifyPageMain from './VerifyPageMain/VerifyPageMain';
import Deprecated from '../../components/DEPRECATED/Deprecated';

export default function VerifyPage() {
  return (
    <Deprecated>
      <div className={styles.registerContainer}>
        <VerifyPageBackground>
          <VerifyPageMain />
        </VerifyPageBackground>
      </div>
    </Deprecated>
  );
}
