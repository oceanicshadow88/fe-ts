import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import styles from './PersonalProfile.module.scss';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { IUserInfo } from '../../../../types';
import { UserDispatchContext } from '../../../../context/UserInfoProvider';
import Avatar from '../../../Avatar/Avatar';

interface Props {
  userInfo: IUserInfo;
}

export default function PersonalProfile({ userInfo }: Props) {
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = (state: boolean) => setVisible(!state);
  const setUserInfo = useContext(UserDispatchContext);

  const logout = () => {
    localStorage.clear();
    setUserInfo({});
  };
  return (
    <div ref={myRef}>
      <div className={styles.rightSection} key={userInfo.id}>
        {visible ? (
          <>
            <div className={styles.avatarSection}>
              <button type="button" onClick={() => handleClickOutside(true)}>
                <div className={styles.avatarContent}>
                  <span>
                    <Avatar
                      avatarIcon={userInfo.avatarIcon}
                      backgroundColor={userInfo.backgroundColor}
                      name={userInfo.name}
                      size={30}
                    />
                  </span>
                </div>
              </button>
            </div>
            <div className={styles.settingDropdown}>
              <div className={styles.settingContainer}>
                <div className={styles.settingContent}>
                  <div className={styles.settingTop}>
                    <h1>Account</h1>
                    <div className={styles.accountContent}>
                      <Avatar
                        avatarIcon={userInfo.avatarIcon}
                        backgroundColor={userInfo.backgroundColor}
                        name={userInfo.name}
                      />
                      <div className={styles.userContext}>
                        <p className={styles.userName}>{userInfo.name}</p>
                        <p>{userInfo.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.settingDetails}>
                    <div className={styles.detail}>
                      <Link to="/me">
                        <div className={styles.title}>
                          <span>Account settings</span>
                        </div>
                        <div className={styles.iconSection}>
                          <div className={styles.icon}>
                            <BsBoxArrowUpRight />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.settingBottom}>
                    <Link to="/#" className={styles.logOutSection} onClick={logout}>
                      <div className={styles.logOutContainer}>
                        <span>Log out</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.avatarSection}>
            <button type="button" onClick={() => handleClickOutside(false)}>
              <div className={styles.avatarContent}>
                <span>
                  <Avatar
                    avatarIcon={userInfo.avatarIcon}
                    backgroundColor={userInfo.backgroundColor}
                    name={userInfo.name}
                    size={30}
                  />
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
