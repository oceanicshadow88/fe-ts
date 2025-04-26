import React from 'react';
import { TiTick } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import styles from './Bullets.module.scss';

interface IBulletProps {
  category: string;
  subTitle: string;
  benefits: string[];
  icon: React.ReactNode;
  showTryFree?: boolean;
}

export default function Bullets(props: IBulletProps) {
  const { category, subTitle, benefits, showTryFree = false, icon } = props;
  return (
    <div className={[styles.businessContent].join(' ')}>
      <p className={styles.eyebrow}>
        {icon}
        {category}
      </p>
      <h3 className={styles.subTitle}>{subTitle}</h3>
      <div className={styles.jobDoneParagraph}>
        <ul>
          {benefits.map((item) => {
            return (
              <li key={item}>
                <TiTick />
                {item}
              </li>
            );
          })}
        </ul>
        <div className={['flex', styles.links].join(' ')}>
          {showTryFree && (
            <Link className={styles.button} to="/register">
              Try TechScrum free
            </Link>
          )}
          <Link className={styles.link} to="/">
            (WIP) Learn more {'>'}
          </Link>
        </div>
      </div>
    </div>
  );
}

Bullets.defaultProps = {
  showTryFree: false
};
