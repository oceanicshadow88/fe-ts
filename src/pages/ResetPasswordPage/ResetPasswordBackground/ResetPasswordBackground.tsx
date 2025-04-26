import React from 'react';
import styles from './ResetPasswordBackground.module.scss';

interface ResetPasswordPageBackground {
  children?: React.ReactNode;
}

export default function PasswordResetBackground(props: ResetPasswordPageBackground) {
  const { children } = props;
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
      {children}
    </div>
  );
}

PasswordResetBackground.defaultProps = {
  children: null
};
