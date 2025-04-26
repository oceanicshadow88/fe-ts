import React from 'react';
import Header from '../../../components/Header/Header';
import { navItems } from '../../../config/pages/tac';
import StepsNav from '../../Nav/StepsNav/StepsNav';
import styles from './TermsAndConditionsLayout.module.scss';

export interface ITermsAndConditionsLayout {
  title: string;
  children: React.ReactNode;
}

export default function TermsAndConditionsLayout({ title, children }: ITermsAndConditionsLayout) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>{title}</h1>
        {/* <svg
          className="MuiBox-root css-19uvnyd"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
        >
          <path fill="#ffffff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
        </svg> */}
        <div className={styles.content}>
          <div className={styles.detailedInfo}>
            <div className={styles.childrenContainer}>{children}</div>
            <StepsNav title="Our Legal Documents" items={navItems} />
          </div>
        </div>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
          alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
          className={styles.bgImg}
        />
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
          alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
          className={styles.bgImg2}
        />
      </div>
    </>
  );
}
