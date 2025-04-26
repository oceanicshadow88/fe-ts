import React from 'react';
import styles from './BtnContainer.module.scss';

interface IBtnContainerV2 {
  children?: React.ReactNode | string;
}

export default function BtnContainer(props: IBtnContainerV2) {
  const { children } = props;
  return <div className={['relative', styles.btnContainer].join(' ')}>{children}</div>;
}

BtnContainer.defaultProps = {
  children: null
};
