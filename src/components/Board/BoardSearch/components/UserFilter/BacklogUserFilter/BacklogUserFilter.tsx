import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../UserFilter.module.scss';
import { IUserInfo } from '../../../../../../types';
import Avatar from '../../../../../Avatar/Avatar';

interface IBacklogFilter {
  user: IUserInfo;
  selectedUsers: IUserInfo[];
  changeSelectedUsers: (
    isExists: boolean,
    selectedItems: IUserInfo[],
    item: IUserInfo
  ) => IUserInfo[];
  setSelectedUsers: Dispatch<SetStateAction<IUserInfo[]>>;
  dataTestId?: string;
}

export default function BacklogUserFilter(props: IBacklogFilter) {
  const { user, selectedUsers, changeSelectedUsers, setSelectedUsers, dataTestId } = props;
  const [pressed, setPressed] = useState(false);

  const handleUserFilterSelect = () => {
    setPressed((prevState) => !prevState);
    let isExists = false;
    selectedUsers.forEach((selectedUser) => {
      if (selectedUser.id === user.id) {
        isExists = true;
      }
    });
    setSelectedUsers(changeSelectedUsers(isExists, selectedUsers, user));
  };

  return (
    <div className={styles.backlogUser} key={user.id} data-testid={dataTestId}>
      <button className={styles.backlogUserIconButton} onClick={handleUserFilterSelect}>
        <div className={styles.backlogUserIconContainer} data-tooltip={user.name}>
          <Avatar user={user} selected={pressed} size={30} />
        </div>
      </button>
    </div>
  );
}
