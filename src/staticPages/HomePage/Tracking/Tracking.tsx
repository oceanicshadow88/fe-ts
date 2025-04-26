import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { TbTrack } from 'react-icons/tb';
import styles from './Tracking.module.scss';
import itemDetails from '../../../assets/item_details-2.png';
import Bullets from '../Bullets/Bullets';

export default function Tracking() {
  return (
    <div className={[styles.jobDoneRows].join(' ')}>
      <div className={[styles.container, styles.row, styles.projectManagement].join(' ')}>
        <Zoom>
          <div className={styles.businessPicture}>
            <img src={itemDetails} alt="business" />
          </div>
        </Zoom>
        <Fade up>
          <Bullets
            icon={<TbTrack className={[styles.eyebrowIcon, 'primaryColor'].join(' ')} />}
            category="Tracking"
            subTitle="Tracking progress to prevent delay"
            benefits={['Daily Standup', 'Process bar', 'Sprint report', 'Due date']}
          />
        </Fade>
      </div>
    </div>
  );
}
