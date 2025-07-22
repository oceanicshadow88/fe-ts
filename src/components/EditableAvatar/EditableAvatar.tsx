import React, { useState } from 'react';
import styles from './EditableAvatar.module.scss';
import Avatar from '../Avatar/Avatar';
import { IUserInfo } from '../../types';
import AvatarEditModal from './AvatarEditModal/AvatarEditModal';

interface IChangeIconProps {
  uploadSuccess: (data: any) => void;
  value: IUserInfo;
  loading?: boolean;
}

export default function ChangeIcon(props: IChangeIconProps) {
  const { uploadSuccess, value, loading = false } = props;
  const [modalShown, toggleModal] = useState(false);

  if (loading) {
    return (
      <div className={(styles.icon, styles.changeIconContainer)}>
        <div className={styles.skeletonImg} />
      </div>
    );
  }

  return (
    <div className={(styles.icon, styles.changeIconContainer)}>
      <Avatar user={value} size={100} />
      <button
        type="button"
        data-testid="iconButton"
        className={styles.uploadImgBtn}
        onClick={() => {
          toggleModal(!modalShown);
        }}
      >
        Change
      </button>
      {modalShown && (
        <AvatarEditModal
          close={() => {
            toggleModal(false);
          }}
          uploadSuccess={(data) => {
            toggleModal(!modalShown);
            uploadSuccess(data);
          }}
        />
      )}
    </div>
  );
}
