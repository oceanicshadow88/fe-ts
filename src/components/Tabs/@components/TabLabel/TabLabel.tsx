import React, { ReactNode } from 'react';
import styles from './TabLabel.module.scss';

export interface ITabLabelProps {
  children: ReactNode;
  index: number;
  onClick?: (index: number) => void;
  isActive?: boolean;
}

export default function TabLabel({
  children,
  index,
  onClick = () => {},
  isActive = false
}: ITabLabelProps) {
  return (
    <button
      className={`${styles.tabItem} ${isActive ? styles.active : ''}`}
      onClick={() => onClick(index)}
    >
      {children}
    </button>
  );
}
