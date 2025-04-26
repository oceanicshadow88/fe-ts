import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BtnList.module.scss';

export default function BtnList() {
  return (
    <div className={styles.buttonList}>
      <Link className={styles.white} to="/register">
        Try TechScrum for Free
      </Link>

      <Link className={styles.black} to="/contact">
        Get in touch
      </Link>
    </div>
  );
}
