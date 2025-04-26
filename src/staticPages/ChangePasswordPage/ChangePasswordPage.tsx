import React from 'react';
import ChangePasswordBackground from './ChangePasswordBackground/ChangePasswordBackground';
import styles from './ChangePasswordPage.module.scss';
import ChangePasswordMain from './ChangePasswordMain/ChangePasswordMain';

export default function RegistePager() {
  return (
    <div className={styles.changePasswordContainer}>
      <ChangePasswordBackground>
        <ChangePasswordMain />
      </ChangePasswordBackground>
    </div>
  );
}
