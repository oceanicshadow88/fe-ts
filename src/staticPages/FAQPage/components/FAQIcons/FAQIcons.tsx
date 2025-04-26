import React from 'react';
import styles from './FAQIcons.module.scss';

export default function FAQIcons() {
  return (
    <section className={styles.FAQicons}>
      <div className={styles.container}>
        <div className={styles.iconsContainer}>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/just-signed-icon.svg"
              alt="Getting started icon"
            />
            <h3 className={styles.iconDescription}>Getting Started</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/Projects-settings.svg"
              alt="Projects settings icon"
            />
            <h3 className={styles.iconDescription}>Using Teamwork</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/projects-overview.svg"
              alt="Working with your projects icon"
            />
            <h3 className={styles.iconDescription}>Working with your projects</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/integrations.svg"
              alt="Integration icon"
            />
            <h3 className={styles.iconDescription}>Integrations</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/projects-tips.svg"
              alt="Teamwork tips icon"
            />
            <h3 className={styles.iconDescription}>Teamwork Tips</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/advanced-settings.svg"
              alt="Teamwork settings icon"
            />
            <h3 className={styles.iconDescription}>Teamwork Settings</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/Working-as-a-team.svg"
              alt="Planing and managing work icon"
            />
            <h3 className={styles.iconDescription}>Planning and Managing Work</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/projects/pricing-and-billing.svg"
              alt="Pricing and billing icon"
            />
            <h3 className={styles.iconDescription}>Pricing and Billing</h3>
          </div>
          <div className={styles.iconContainer}>
            <img
              className={styles.iconImg}
              src="https://s3.amazonaws.com/tw-helpdocs/svgs/agency-icon.svg"
              alt="Agency and professional services icon"
            />
            <h3 className={styles.iconDescription}>Agency and Professional Services</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
