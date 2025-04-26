/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import React, { createContext } from 'react';
import styles from './ProjectHOC.module.scss';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';

interface IProjectHOC {
  children: React.ReactNode;
  title?: string;
}

// Modal provider component
export default function ProjectHOC({ children, title }: IProjectHOC) {
  return (
    <div className={styles.container}>
      <h1 className={styles.header} data-testid="backlog-header">
        {title}
      </h1>
      <ProjectNavigationV3 />
      {children}
    </div>
  );
}
