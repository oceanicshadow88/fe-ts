import React from 'react';
import { TiTick } from 'react-icons/ti';
import { BsQuestionSquare } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import styles from './WhyUs.module.scss';
import home1 from '../../../assets/all_items_table.png';

export default function WhyUs() {
  return (
    <div className={[styles.jobDoneRows].join(' ')}>
      <div className={[styles.container, styles.row, styles.projectManagement].join(' ')}>
        <Fade up>
          <div className={styles.businessPicture}>
            <img src={home1} alt="business" />
          </div>
        </Fade>
        <Fade>
          <div className={[styles.businessContent].join(' ')}>
            <p className={styles.eyebrow}>
              <BsQuestionSquare className={[styles.eyebrowIcon, 'primaryColor'].join(' ')} /> Why
              Choose
            </p>
            <h3>TechScrum</h3>
            <div className={styles.jobDoneParagraph}>
              <ul>
                <li>
                  <TiTick />
                  Great functionalities
                </li>
                <li>
                  <TiTick /> Customizable workflow
                </li>
                <li>
                  <TiTick />
                  Clean UI/UX design
                </li>
                <li>
                  <TiTick />
                  Easy to use
                </li>
                <li>
                  <TiTick />
                  Free version available
                </li>
              </ul>
              <div className={['flex', styles.links].join(' ')}>
                <Link className={styles.button} to="/register">
                  Try TechScrum free
                </Link>
                <Link className={styles.link} to="/register">
                  Take a Product tour {'>'}
                </Link>
              </div>
            </div>
          </div>
        </Fade>
        <img
          src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
          alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
          className={styles.bgImg}
        />
      </div>
    </div>
  );
}
