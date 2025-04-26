import React from 'react';
import styles from './HomeSection.module.scss';
import VideoFrame from '../VideoFrame/VideoFrame';
import InputEmail from '../InputEmail/InputEmail';
import ButtonGetStart from '../ButtonGetStart/ButtonGetStart';
import shapeLight from '../../../assets/shapeLight.png';
import darkCircle from '../../../assets/shapeDark.png';

export default function HomeSection() {
  return (
    <div className={styles.unauthorizePageContainer}>
      <span className={styles.shape2Container}>
        <img src={shapeLight} alt="" />
      </span>
      <div className={styles.circleContainer}>
        <img
          src="https://themexriver.com/appilo-theme/saas-classic-dark/wp-content/uploads/sites/19/2021/07/b-shape2.png"
          alt=""
        />
      </div>
      <span className={styles.shape3Container}>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
          alt=""
        />
      </span>
      <span className={styles.shape4Container}>
        <img src={darkCircle} alt="" />
      </span>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.homeLeft}>
            <h1 className={styles.heading}>Create the perfect Agile workflow with Board view.</h1>
            <p className={styles.subTitle}>
              Build a flexible Kanban system to visualize your work and improve project management.
            </p>
            <InputEmail />
            <ButtonGetStart />
          </div>
          <div className={styles.homeRight}>
            <VideoFrame />
          </div>
        </div>
      </div>
    </div>
  );
}
