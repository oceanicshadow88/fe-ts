import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from '../UserFilter.module.scss';
import BacklogUserFilterDropdownSelectButton from './BacklogUserFilterDropdownSelectButton/BacklogUserFilterDropdownSelectButton';
import { IUserInfo } from '../../../../../../types';

interface IBacklogFilterDropdown {
  users: IUserInfo[];
  selectedUsers: IUserInfo[];
  changeSelectedUsers: (
    isExists: boolean,
    selectedItems: IUserInfo[],
    item: IUserInfo
  ) => IUserInfo[];
  setSelectedUsers: Dispatch<SetStateAction<IUserInfo[]>>;
}

export default function BacklogUserFilterDropdown(props: IBacklogFilterDropdown) {
  const [visible, setVisible] = useState(false);
  const { users, selectedUsers, changeSelectedUsers, setSelectedUsers } = props;
  const myRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (myRef.current !== null && !myRef.current.contains(target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div className={styles.backlogUser} ref={myRef}>
      <button
        className={styles.backlogUserIconButton}
        onClick={() => {
          setVisible((prevState) => !prevState);
        }}
      >
        <div className={styles.backlogRestUsers}>+{users.length}</div>
      </button>
      {visible && (
        <div className={styles.backlogRestUsersDropdownContainer}>
          {users.map((user) => (
            <BacklogUserFilterDropdownSelectButton
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              changeSelectedUsers={changeSelectedUsers}
              key={user.id}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
}
