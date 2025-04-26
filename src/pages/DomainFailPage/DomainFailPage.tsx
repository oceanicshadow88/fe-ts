import React from 'react';
import styles from './DomainFailPage.module.scss';

export default function DomainFailPage() {
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
        <h1 className={styles.header}>Oops</h1>
        <p className={styles.text}>We didn&apos;t find your site.</p>
        <br />
        <p className={styles.text}>
          It seems that this site has not been register, please check that you have register this
          site. If there are no known problems please contact our support team.
        </p>
      </div>
    </div>
  );
}
