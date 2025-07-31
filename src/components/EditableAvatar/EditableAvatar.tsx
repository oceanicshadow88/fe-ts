import React, { useState } from 'react';
import styles from './EditableAvatar.module.scss';
import Avatar from '../Avatar/Avatar';
import AvatarEditModal from './AvatarEditModal/AvatarEditModal';

interface IEditableAvatarProps {
  uploadSuccess: (data: string) => void;
  avatarIcon?: string;
  backgroundColor?: string;
  name?: string;
  loading?: boolean;
  addPredefinedIcons?: boolean;
}

export default function EditableAvatar(props: IEditableAvatarProps) {
  const {
    uploadSuccess,
    avatarIcon,
    backgroundColor,
    name,
    loading = false,
    addPredefinedIcons = false
  } = props;
  const [modalShown, toggleModal] = useState(false);

  if (loading) {
    return (
      <div className={(styles.icon, styles.editableAvatarContainer)}>
        <div className={styles.skeletonImg} />
      </div>
    );
  }

  return (
    <div className={(styles.icon, styles.editableAvatarContainer)}>
      <Avatar avatarIcon={avatarIcon} backgroundColor={backgroundColor} name={name} size={100} />
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
          initialValue={avatarIcon}
          addPredefinedIcons={addPredefinedIcons}
          close={() => {
            toggleModal(false);
          }}
          uploadSuccess={(data) => {
            uploadSuccess(data);
          }}
        />
      )}
    </div>
  );
}
