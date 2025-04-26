import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import styles from './AnyWhereSection.module.scss';
import image from '../../../assets/iphone-cta-noshadow.png';

export default function AnyWhereSection() {
  return (
    <div className={[styles.anywhereSection, 'flex alignCenter container spaceBetween'].join(' ')}>
      <Zoom>
        <img src={image} className={styles.imgPhone} alt="sdf" />
      </Zoom>
      <Fade>
        <div className={styles.anyWhereContent}>
          <h2>Manage from anywhere.</h2>
          <p>
            Our software support responsive design so it makes it easy for you too use anyway,
            anytime for free.
          </p>
          <div className={styles.phone}>
            <img
              src="https://www.sortly.com/wp-content/themes/sortly_2022_redesign/assets/img/app-store.svg"
              alt="iphone"
            />
            <img
              src="https://www.sortly.com/wp-content/themes/sortly_2022_redesign/assets/img/google-play.svg"
              alt="iphone"
            />
          </div>
        </div>
      </Fade>
    </div>
  );
}
