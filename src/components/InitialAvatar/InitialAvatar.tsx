import React from 'react';
import styles from './InitialAvatar.module.scss';

interface AvatarProps {
  name: string;
  backgroundColor?: string;
  size?: number;
  selected?: boolean;
}

function InitialAvatar({ name, backgroundColor, size = 25, selected = false }: AvatarProps) {
  const getInitials = (fullName: string) => {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
      return `${nameParts[0][0]}`.toUpperCase();
    }
    return nameParts
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`${styles.avatar} ${selected ? styles.selected : ''}`}
      style={{
        backgroundColor,
        width: size,
        height: size,
        fontSize: size > 90 ? '2rem' : '0.7rem'
      }}
    >
      {getInitials(name)}
    </div>
  );
}

export default InitialAvatar;
