import React from 'react';
import styles from './Avatar.module.scss';
import { IUserInfo } from '../../types';
import InitialAvatar from '../InitialAvatar/InitialAvatar';
import userAvatar from '../../assets/userAvatar.png';

interface AvatarProps {
  user?: IUserInfo | null;
  selected?: boolean;
  size?: number;
}

function Avatar({ user, selected = false, size = 25 }: AvatarProps) {
  if (!user || user?.name === 'Unassigned') {
    return (
      <img
        className={selected ? styles.backlogUserIconWithBorder : styles.backlogUserIcon}
        src={userAvatar}
        alt="Unassigned"
      />
    );
  }

  const { name, avatarIcon, backgroundColor = '' } = user;

  if (avatarIcon) {
    return (
      <img
        className={selected ? styles.backlogUserIconWithBorder : styles.backlogUserIcon}
        src={user.avatarIcon}
        alt={user.name}
      />
    );
  }
  return (
    <InitialAvatar
      name={name ?? ''}
      backgroundColor={backgroundColor}
      size={size}
      selected={selected}
    />
  );
}

export default Avatar;
