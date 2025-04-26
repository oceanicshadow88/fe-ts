import React from 'react';

import styles from './Scroll.module.scss';

export default function Scroll() {
  return (
    <div className={styles.scrollDowns}>
      <div className={styles.mousey}>
        <div className={styles.scroller} />
      </div>
    </div>
  );
}
