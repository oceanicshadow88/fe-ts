import React from 'react';
import { Outlet } from 'react-router-dom';
import MainMenuV2 from '../../../pages/MainMenuV2/MainMenuV2';
import styles from './DashboardLayout.module.scss';

export default function DashboardLayout() {
  return (
    <div className={styles.container}>
      <MainMenuV2 />
      <div className={styles.childrenContainer}>
        <Outlet />
      </div>
    </div>
  );
}
