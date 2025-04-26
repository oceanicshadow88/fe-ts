import React from 'react';
import styles from './ErrorPage.module.scss';

export default function ErrorPage() {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.picture1Container}>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape.png"
          alt=""
        />
      </div>
      <span className={styles.picture2Container}>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-2.png"
          alt=""
        />
      </span>
      <span className={styles.picture3Container}>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
          alt=""
        />
      </span>
      <div className={styles.textContainer}>
        <h1 className={styles.header}>404</h1>
        <p className={styles.text}>Page not found</p>
        <p className={styles.text}>
          The page you are looking for doesn‘t exist or an other error occurred.
        </p>
      </div>
    </div>
  );
}
