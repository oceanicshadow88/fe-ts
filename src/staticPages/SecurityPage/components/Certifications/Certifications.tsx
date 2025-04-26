import React from 'react';
import styles from './Certifications.module.scss';

export default function Certifications() {
  return (
    <div className={styles.certContainer}>
      <div className={styles.certDesc}>
        <h2>Our security certifications</h2>
        <p className={styles.descText}>
          Delivering a safe and secure experience for our customers is of the utmost importance to
          us. Learn more about our commitment to best-in-class information security standards below.
        </p>
        <p className={styles.descSpan}>
          <a className={styles.isoLink} href="https://www.teamwork.com/security/iso/">
            ISO/IEC 27001:2013
          </a>
          <a
            className={styles.isoLink}
            href="https://www.teamwork.com/security/soc-2-certification/"
          >
            SOC 2 Type 2 certified
          </a>
        </p>
        <button className={styles.learnMoreButton}>Learn More</button>
      </div>
      <div className={styles.certImgs}>
        <img
          className={styles.certImg}
          src="https://website-assets.teamwork.com/offload/app/uploads/2020/07/22164825/soc-logo.png"
          alt="SOC 2 Type 1 certified"
        />
        <img
          className={styles.certImg}
          src="https://website-assets.teamwork.com/offload/app/uploads/2020/07/22164823/ISO27001-logo.png"
          alt="ISO 27001 Certification"
        />
      </div>
    </div>
  );
}
