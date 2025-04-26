import React, { Dispatch, SetStateAction } from 'react';
import styles from './UserFilter.module.scss';
import BacklogUserFilter from './BacklogUserFilter/BacklogUserFilter';
import BacklogUserFilterDropdown from './BacklogUserFilterDropdown/BacklogUserFilterDropdown';
import { IUserInfo } from '../../../../../types';

interface IUserFilter {
  userList: IUserInfo[];
  selectedUsers: IUserInfo[];
  changeSelectedUsers: (
    isExists: boolean,
    selectedItems: IUserInfo[],
    item: IUserInfo
  ) => IUserInfo[];
  setSelectedUsers: Dispatch<SetStateAction<IUserInfo[]>>;
}

export default function UserFilter(props: IUserFilter) {
  const { selectedUsers, changeSelectedUsers, userList, setSelectedUsers } = props;
  // eslint-disable-next-line no-console
  const updatedUserOptions = [
    ...userList,
    {
      id: 'unassigned',
      name: 'Unassigned',
      userName: 'Unassigned',
      avatarIcon:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    }
  ];

  return (
    <div className={styles.BacklogFilterArea}>
      {updatedUserOptions?.slice(0, 4).map((user) => (
        <BacklogUserFilter
          selectedUsers={selectedUsers}
          changeSelectedUsers={changeSelectedUsers}
          setSelectedUsers={setSelectedUsers}
          key={user.id}
          user={user}
        />
      ))}
      {updatedUserOptions?.length > 4 && (
        <BacklogUserFilterDropdown
          selectedUsers={selectedUsers}
          changeSelectedUsers={changeSelectedUsers}
          setSelectedUsers={setSelectedUsers}
          users={updatedUserOptions.slice(4)}
        />
      )}
    </div>
  );
}
