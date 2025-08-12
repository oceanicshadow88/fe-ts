import React from 'react';
import styles from './Avatar.module.scss';
import InitialAvatar from '../InitialAvatar/InitialAvatar';
import userAvatar from '../../assets/userAvatar.png';

interface AvatarProps {
  avatarIcon?: string;
  backgroundColor?: string;
  name?: string;
  unassignedAvatar?: string;
  selected?: boolean;
  size?: number;
}

function Avatar({
  avatarIcon,
  backgroundColor = '',
  name = 'Unassigned',
  unassignedAvatar = userAvatar,
  selected = false,
  size = 25
}: AvatarProps) {
  if (avatarIcon || name === 'Unassigned') {
    return (
      <img
        style={{ width: size, height: size }}
        className={selected ? styles.backlogUserIconWithBorder : styles.backlogUserIcon}
        src={avatarIcon || unassignedAvatar}
        alt={name}
      />
    );
  }

  return (
    <InitialAvatar name={name} backgroundColor={backgroundColor} size={size} selected={selected} />
  );
}

export default Avatar;
