import React from 'react';
import styles from './NavigationLayout.module.scss';

export interface INavigationLayout {
  children: React.ReactNode | string;
}

export default function NavigationLayout(props: INavigationLayout) {
  const { children } = props;
  return (
    <>
      <div id="projectDropdownNav" />
      <nav className={styles.container}>{children}</nav>
    </>
  );
}
