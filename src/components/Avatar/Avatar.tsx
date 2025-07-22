import React from 'react';
import styles from './Avatar.module.scss';
import InitialAvatar from '../InitialAvatar/InitialAvatar';
import userAvatar from '../../assets/userAvatar.png';

interface AvatarProps {
  src?: string;
  backgroundColor?: string;
  name?: string;
  selected?: boolean;
  size?: number;
}

function Avatar({
  src,
  backgroundColor = '',
  name = 'Unassigned',
  selected = false,
  size = 25
}: AvatarProps) {
  if (src) {
    return (
      <img
        style={{ width: size, height: size }}
        className={selected ? styles.backlogUserIconWithBorder : styles.backlogUserIcon}
        src={src}
        alt="AvatarImage"
      />
    );
  }
  if (name === 'Unassigned') {
    return (
      <img
        style={{ width: size, height: size }}
        className={selected ? styles.backlogUserIconWithBorder : styles.backlogUserIcon}
        src={userAvatar}
        alt="Unassigned"
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
