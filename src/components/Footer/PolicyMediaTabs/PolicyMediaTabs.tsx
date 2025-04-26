import React from 'react';
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styles from './PolicyMediaTabs.module.scss';
import IOS from './download-app-iOS.svg';
import Android from './download-app-google.svg';
import pJson from '../../../../package.json';

export default function PolicyMediaTabs() {
  return (
    <div className={styles.policiesMediaDownloadPlatform}>
      <div className={styles.leftItem}>
        <Link to="/privacy-policy">Terms & Privacy ({pJson.version})</Link>
      </div>
      <div className={styles.middleItem}>
        <a href="https://www.facebook.com/techscrumapp">
          <AiFillFacebook />
        </a>
        <a href="https://www.linkedin.com/techscrumapp">
          <AiFillLinkedin />
        </a>
        <a href="https://www.twitter.com/techscrumapp">
          <AiFillTwitterSquare />
        </a>
        <a href="https://www.youtube.com/techscrumapp">
          <AiFillYoutube />
        </a>
        <a href="https://www.instagram.com/techscrumapp">
          <AiFillInstagram />
        </a>
      </div>
      <div className={styles.rightItem}>
        <a href="https://www.apple.com/techscrumapp">
          <img src={IOS} alt="Download iOS App" draggable="false" loading="lazy" />
        </a>
        <a href="https://www.google.com/play/techscrumapp">
          <img src={Android} alt="Download Android App" draggable="false" loading="lazy" />
        </a>
      </div>
    </div>
  );
}
