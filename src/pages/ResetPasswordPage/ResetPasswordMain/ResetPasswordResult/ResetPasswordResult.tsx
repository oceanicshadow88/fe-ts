import React from 'react';
import styles from './ResetPasswordResult.module.scss';
import Error from '../../../../assets/error.png';
import Email from '../../../../assets/email.png';

interface Props {
  successFlag: boolean;
}

export default function ResetPasswordResult({ successFlag }: Props) {
  return (
    <div className={styles.resetPasswordResultContainer}>
      {successFlag ? (
        <>
          <img src={Email} alt="Email Icon" />
          <h1>
            An email has been sent for password recovery. Please check your inbox for further
            instructions.
          </h1>
        </>
      ) : (
        <>
          <img src={Error} alt="Email Icon" />
          <h1>Server error, Kindly review your email or contact support for assistance</h1>
        </>
      )}
    </div>
  );
}
