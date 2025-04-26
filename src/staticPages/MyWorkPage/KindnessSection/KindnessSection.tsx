import React from 'react';
import styles from './KindnessSection.module.scss';

function KindnessSection() {
  return (
    <ul className={styles.wrapper}>
      <li className={styles.item}>
        <div>
          <a href="/on-demand-demo">
            <b>Free training</b>
          </a>
          &nbsp;<span>&amp;</span>
          <a href="/help">24-hour support</a>
        </div>
      </li>
      <li className={[styles.item, styles.itemSecurity].join(' ')}>
        <div>
          Serious about&nbsp;
          <a href="/security">
            <b>security &amp; privacy</b>
          </a>
        </div>
      </li>
      <li className={[styles.item, styles.itemUptime].join(' ')}>
        <div>
          <a href="https://status.clickup.com/" target="_blank" rel="noreferrer">
            <b>Highest levels of uptime</b>
          </a>
          &nbsp;the last 12 months
        </div>
      </li>
    </ul>
  );
}

export default KindnessSection;
