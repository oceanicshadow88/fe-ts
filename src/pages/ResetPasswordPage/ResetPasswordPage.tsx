import React from 'react';
import ResetPasswordBackground from './ResetPasswordBackground/ResetPasswordBackground';
import styles from './ResetPasswordPage.module.scss';
import ResetPasswordMain from './ResetPasswordMain/ResetPasswordMain';

export default function ForgetPasswordPager() {
  return (
    <div className={styles.resetPasswordContainer}>
      <ResetPasswordBackground>
        <ResetPasswordMain />
      </ResetPasswordBackground>
    </div>
  );
}
