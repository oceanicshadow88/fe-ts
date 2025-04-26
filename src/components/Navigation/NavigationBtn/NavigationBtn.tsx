import React from 'react';
import styles from './NavigationBtn.module.scss';

export interface INavigationBtn {
  dataTestId: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode | string;
  classesName?: string | string[];
}

export default function NavigationBtn(props: INavigationBtn) {
  const { dataTestId, onClick, children, classesName } = props;
  return (
    <button
      data-testid={dataTestId}
      className={[styles.navBtn, classesName].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

NavigationBtn.defaultProps = {
  classesName: null
};
