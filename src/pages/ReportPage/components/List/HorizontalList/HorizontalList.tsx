import React from 'react';
import styles from './HorizontalList.module.scss';

interface Props {
  listTitle: string;
  list: string[];
}

function HorizontalList({ listTitle, list }: Props) {
  return (
    <div className={styles.listWrapper}>
      <h3 className={styles.listTitle}>{listTitle}:</h3>
      <ul className={styles.horizontalList}>
        {list.map((item) => (
          <li key={crypto.randomUUID()}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default HorizontalList;
