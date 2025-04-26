import React from 'react';
import styles from './ValueCard.module.scss';

type Props = {
  title: string;
  value: string | number;
  style?: React.CSSProperties;
};

export default function ValueCard({ title, value, style }: Props) {
  return (
    <div className={styles.mainWrapper} style={{ ...style }}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

ValueCard.defaultProps = {
  style: {}
};
