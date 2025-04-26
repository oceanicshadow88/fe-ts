import React from 'react';
import { TiTick } from 'react-icons/ti';
import { BsBoxSeam } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import styles from './Organizing.module.scss';
import itemDetails from '../../../assets/item_details-2.png';

export default function Organizing() {
  return (
    <div className={[styles.jobDoneRows].join(' ')}>
      <div className={[styles.container, styles.row, styles.projectManagement].join(' ')}>
        <Fade>
          <div className={[styles.businessContent].join(' ')}>
            <p className={styles.eyebrow}>
              <BsBoxSeam className={[styles.eyebrowIcon, 'primaryColor'].join(' ')} /> Collaborating
            </p>
            <h3>Collaborating with team members on work projects in a clear view</h3>
            <div className={styles.jobDoneParagraph}>
              <ul>
                <li>
                  <TiTick />
                  Project
                </li>
                <li>
                  <TiTick /> Sprint Board
                </li>
                <li>
                  <TiTick />
                  Card
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
        <Zoom>
          <div className={styles.businessPicture}>
            <img src={itemDetails} alt="business" />
          </div>
        </Zoom>
      </div>
    </div>
  );
}
