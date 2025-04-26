import React from 'react';
import styles from './Card.module.scss';

export default function Card() {
  return (
    <div className={styles.securityCardDivContainer}>
      <h2 className={styles.headaing}>We keep your data safe</h2>
      <p className={styles.subHeading}>
        Maintaining the security, integrity, and confidentiality of your data is our top priority.
      </p>
      <div className={styles.securityCards}>
        <div className={styles.securityCardContainer}>
          <img
            className={styles.webAssetsImg}
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/02/26115308/04-privacy.svg"
            alt="Data privacy is paramount at Teamwork"
          />
          <div className={styles.securityCardDesc}>
            <h4>Privacy is paramount </h4>
            <p className={styles.webAssetsDesc}>
              Every byte of information that you store with us is owned by you. We’ll never copy,
              share, or modify your data, or access it without your consent.
            </p>
            <span className={styles.learnMore}>Learn more ›</span>
          </div>
        </div>
        <div className={styles.securityCardContainer}>
          <img
            className={styles.webAssetsImg}
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/02/26115741/03-99percent-uptime.svg"
            alt="We aim to maintain an uptime of over 99.9%"
          />
          <div className={styles.securityCardDesc}>
            <h4>99.9% uptime</h4>
            <p className={styles.webAssetsDesc}>
              Every byte of information that you store with us is owned by you. We’ll never copy,
              share, or modify your data, or access it without your consent.
            </p>
            <span className={styles.learnMore}>Learn more ›</span>
          </div>
        </div>
        <div className={styles.securityCardContainer}>
          <img
            className={styles.webAssetsImg}
            src="https://website-assets.teamwork.com/offload/app/uploads/2020/02/26120032/06-backups.svg"
            alt="Frequent monitoring and backups to ensure your data is safe"
          />
          <div className={styles.securityCardDesc}>
            <h4>Monitoring and backups</h4>
            <p className={styles.webAssetsDesc}>
              We take automatic database snapshots every few seconds so you can have complete peace
              of mind that your data is 100% safe.
            </p>
            <span className={styles.learnMore}>Learn more ›</span>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
