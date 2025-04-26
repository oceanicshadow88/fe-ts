import React from 'react';
import styles from './CooperateTabs.module.scss';
import Background from './Background/Background';
import Description from './Description/Description';
import BtnList from './BtnList/BtnList';

export default function CooperateTabs() {
  return (
    <div className={styles.TechScrumLabel}>
      <Background />
      <Description />
      <BtnList />
    </div>
  );
}
