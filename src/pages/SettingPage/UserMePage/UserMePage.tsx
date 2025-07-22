import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import EditableAvatar from '../../../components/EditableAvatar/EditableAvatar';
import { UserContext, UserDispatchContext } from '../../../context/UserInfoProvider';
import styles from './UserMePage.module.scss';
import SettingCard from '../../../components/SettingCard/SettingCard';

import MainMenuV2 from '../../MainMenuV2/MainMenuV2';
import SubSettingMenu from '../../../lib/SubSettingMenu/SubSettingMenu';
import ButtonV2 from '../../../lib/FormV2/ButtonV2/ButtonV2';
import InputV2 from '../../../lib/FormV2/InputV2/InputV2';
import Modal from '../../../lib/Modal/Modal';
import changePassword from '../../../api/accountSetting/changePassword';
import { updateMe } from '../../../api/user/user';

export default function UserMePage() {
  const userInfo = useContext(UserContext);
  const setUserInfo = useContext(UserDispatchContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const onChangeUser = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSaveMe = async () => {
    if (!userInfo.token) {
      return;
    }

    try {
      await updateMe(
        {
          id: userInfo.id,
          name: userInfo.name,
          avatarIcon: userInfo?.avatarIcon,
          userName: userInfo.userName,
          abbreviation: userInfo.abbreviation,
          jobTitle: userInfo.jobTitle,
          location: userInfo.location
        },
        userInfo.token
      );
      toast.success('Saved', {
        theme: 'colored',
        className: 'primaryColorBackground'
      });
    } catch (e) {
      toast.error('Something go Wrong, please try again', {
        theme: 'colored',
        toastId: 'toast-error'
      });
    }
  };

  const onUpdatePassword = async () => {
    const token = userInfo?.token;
    if (newPassword === confirmPassword) {
      try {
        const data = { oldPassword, newPassword, userInfo };
        await changePassword(data, token);
        toast('Your password has been successfully updated!');
      } catch (e) {
        toast.error('The current password is not correct!');
      }
    } else {
      toast.error('New Password does not match confirm password, please check again!');
    }
  };

  const loading = !userInfo || Object.keys(userInfo).length === 0;

  return (
    <>
      <div className={styles.settingPage} data-testid="setting-page">
        <MainMenuV2 />
        <SubSettingMenu />
        <div className={styles.settingContainer}>
          <div className={styles.settingMiniContainer}>
            <header>
              <h1 className={styles.headerText}>User Profile</h1>
              <hr className={styles.divider} />
            </header>
            <SettingCard title="Personal Information">
              <EditableAvatar
                src={userInfo.avatarIcon}
                backgroundColor={userInfo.backgroundColor}
                name={userInfo.name}
                uploadSuccess={(photoData: any) => {
                  onChangeUser({ target: { name: 'avatarIcon', value: photoData[0].location } });
                }}
              />
              <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
                <InputV2
                  label="User Name"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.userName}
                  name="userName"
                  loading={loading}
                  dataTestId="userName"
                />
                <InputV2
                  label="Full Name"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.name}
                  name="name"
                  loading={loading}
                  dataTestId="name"
                />
              </div>
              <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
                <InputV2
                  label="Job Title"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.jobTitle}
                  name="jobTitle"
                  loading={loading}
                  dataTestId="jobTitle"
                />
                <InputV2
                  label="Location"
                  onValueChanged={onChangeUser}
                  defaultValue={userInfo.location}
                  name="location"
                  loading={loading}
                  dataTestId="location"
                />
              </div>
              <ButtonV2 text="Save Changes" onClick={onSaveMe} dataTestId="save-changes" />
            </SettingCard>
            <SettingCard title="Change Password">
              <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
                <InputV2
                  label="Old Password"
                  onValueChanged={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  onValueBlur={() => {}}
                  defaultValue=""
                  name="oldPassword"
                  type="password"
                  dataTestId="oldPassword"
                />
              </div>
              <div className={[styles.gap, styles.row, 'flex'].join(' ')}>
                <InputV2
                  label="New Password"
                  onValueChanged={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  onValueBlur={() => {}}
                  defaultValue=""
                  name="newPassword"
                  type="password"
                  dataTestId="newPassword"
                />
                <InputV2
                  label="Confirm New Password"
                  onValueChanged={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  onValueBlur={() => {}}
                  defaultValue=""
                  name="confirmPassword"
                  type="password"
                  dataTestId="confirmPassword"
                />
              </div>
              <ButtonV2 text="Update" onClick={onUpdatePassword} />
            </SettingCard>
            <SettingCard title="Delete Account (WIP)">
              <p className={styles.p}>
                Delete your account and all of your source data. This is irreversible.
              </p>
              <ButtonV2
                text="DELETE"
                danger
                size="xs"
                dataTestId="delete-account"
                onClick={() => {
                  setShowDeleteModal(true);
                }}
              />
            </SettingCard>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <Modal classesName={styles.modal}>
          <p>Are you sure you want to delete the account?</p>
          <div className={styles.modalBtn}>
            <ButtonV2
              text="Confirm"
              danger
              onClick={() => {
                setSubmitting(true);
              }}
              disabled={submitting}
            />
            <ButtonV2
              text="Cancel"
              fill
              onClick={() => {
                setShowDeleteModal(false);
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
