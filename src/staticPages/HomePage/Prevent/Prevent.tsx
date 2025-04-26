import React from 'react';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { BsBoxSeam } from 'react-icons/bs';
import styles from './Prevent.module.scss';
import itemDetails from '../../../assets/item_details-2.png';
import Bullets from '../Bullets/Bullets';

export default function Prevent() {
  return (
    <div className={[styles.jobDoneRows].join(' ')}>
      <div className={[styles.container, styles.row, styles.projectManagement].join(' ')}>
        <Fade up>
          <Bullets
            icon={<BsBoxSeam className={[styles.eyebrowIcon, 'primaryColor'].join(' ')} />}
            category="Managing"
            subTitle="Managing tickets with all information organized"
            benefits={['Members', 'Attachments', 'Comments & Activities', 'Checklist']}
          />
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
