import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AccountSettingPage.module.scss';
import AccountSettingHeader from './accountSettingHeader/accountSettingHeader';
import ChangePassword from './changePassword/changePassword';
import DeleteAccount from './deleteAccount/deleteAccount';

export default function AccountSettingPage() {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  const navigation = useNavigate();

  const eventHandler = (tip: string, status: number) => {
    if (status === 0) {
      navigation(`/`);
    }
  };

  const onClickEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    navigation(`/account-settings/${button.name}`);
    setPath(button.name);
  };

  return (
    <>
      <AccountSettingHeader />

      <div className={styles.cards}>
        <div className={styles.accountContainer}>
          <div className={styles.accountHeader}>
            <h3>Account Settings</h3>
          </div>
          <div className={styles.accountSettingContent}>
            <div className={styles.accountSidebar}>
              <button
                type="button"
                className={path.includes('change-password') ? styles.selectedButton : ''}
                onClick={onClickEventHandler}
                name="change-password"
              >
                Change Password
              </button>
              <button>Notifications</button>
              <button>Others</button>
              <hr />
              <button
                className={
                  path.includes('delete-account')
                    ? [styles.deleteButton, styles.selectedDeleteButton].join(' ')
                    : styles.deleteButton
                }
                onClick={onClickEventHandler}
                name="delete-account"
              >
                Delete Account
              </button>
            </div>
            {path.includes('change-password') && (
              <ChangePassword changePasswordTipHandler={eventHandler} />
            )}
            {path.includes('delete-account') && (
              <DeleteAccount deleteAccountTipHandler={eventHandler} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
