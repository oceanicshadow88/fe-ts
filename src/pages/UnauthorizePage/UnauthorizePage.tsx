import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UnauthorizePage.module.scss';

export default function UnauthorizePage() {
  return (
    <div className={styles.unauthorizePageContainer}>
      <span className={styles.shape2Container}>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-2.png"
          alt=""
        />
      </span>
      <div className={styles.circleContainer}>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape.png"
          alt=""
        />
      </div>
      <span className={styles.shape3Container}>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
          alt=""
        />
      </span>
      <div className={styles.textContainer}>
        <h1 className={styles.header}>Unauthorize</h1>
        <p className={styles.text}>Authorization required </p>
        <p className={styles.text}>To access this page please contact your admin</p>
        <div className={styles.btnContainer}>
          <Link to="/" className={styles.button}>
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
