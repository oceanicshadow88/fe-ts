import React from 'react';
import styles from './Loading.module.scss';

interface ILoading {
  height?: string;
}

export default function Loading(props: ILoading) {
  const { height = '90vh' } = props;
  return (
    <div className={styles.loadingContainer} style={{ height }}>
      <div className={styles.bounce}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

Loading.defaultProps = {
  height: '90vh'
};
