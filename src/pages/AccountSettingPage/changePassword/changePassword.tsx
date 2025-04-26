import React, { useState } from 'react';
import changePassword from '../../../api/accountSetting/changePassword';
import styles from './changePassword.module.scss';

interface Props {
  changePasswordTipHandler: (tip: string, statusCode: number) => void;
}

export default function ChangePassword({ changePasswordTipHandler }: Props) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fetchOldPassword = (input: string) => {
    setOldPassword(input);
  };

  const fetchNewPassword = (input: string) => {
    setNewPassword(input);
  };

  const fetchConfirmPassword = (input: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (input !== newPassword) {
      e.target.setCustomValidity('Password Difference.');
      return;
    }
    e.target.setCustomValidity('');
    setConfirmPassword(input);
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      return;
    }

    try {
      // This page is not used in V2
      const result = await changePassword(
        {
          oldPassword,
          newPassword
        },
        'abc'
      );

      if (!result) {
        changePasswordTipHandler('Something go Wrong, Please contact Administrator', 1);
      }

      if (result?.status === 204) {
        changePasswordTipHandler('Password Change Success', 0);
        return;
      }
      if (result?.status === 404) {
        changePasswordTipHandler('Cannot Connect Service', 1);
        return;
      }
      if (result?.status === 406) {
        changePasswordTipHandler('Validation Error', 1);
        return;
      }
      changePasswordTipHandler('Something go Wrong, Please contact Administrator', 1);
    } catch (err) {
      changePasswordTipHandler('Something go Wrong, Please contact Administrator', 1);
    }
  };

  return (
    <div className={styles.rightContent}>
      <form onSubmit={submitHandler}>
        <span>Old Password</span>
        <input
          className={styles.passwordInput}
          type="password"
          placeholder="Enter Old Password"
          onChange={(e) => fetchOldPassword(e.target.value)}
          required
        />
        <span>New Password</span>
        <input
          className={styles.passwordInput}
          type="password"
          placeholder="Enter New Password"
          onChange={(e) => fetchNewPassword(e.target.value)}
          minLength={6}
          maxLength={16}
          required
        />
        <span>Confirm Password</span>
        <input
          className={styles.passwordInput}
          type="password"
          placeholder="Re-enter New Password"
          onChange={(e) => fetchConfirmPassword(e.target.value, e)}
          minLength={6}
          maxLength={16}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
