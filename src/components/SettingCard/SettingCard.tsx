/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from './SettingCard.module.scss';

interface ISettingCard {
  children: React.ReactNode | string;
  title: string;
}

export default function SettingCard(props: ISettingCard) {
  const { title, children } = props;

  return (
    <div className={styles.boxContainer}>
      <h2 className={styles.headerTitle}>{title}</h2>
      {children}
    </div>
  );
}
