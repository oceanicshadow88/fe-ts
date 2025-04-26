import React from 'react';
import styles from './TrailHeading.module.scss';

interface ITrialHeadingProps {
  isMonthly: boolean;
  handleToggleBillingPlan: () => void;
}

function TrialHeading(props: ITrialHeadingProps) {
  const { isMonthly, handleToggleBillingPlan } = props;

  return (
    <div className={styles.text}>
      <div>
        <h1>
          <span className={styles.start}>Start</span> Your 14-Day Trial Today!
        </h1>
        <h5>
          Save your business time, money, and hassle with the top-rated inventory management
          software.
        </h5>
      </div>
      <div className={styles.option}>
        <p className={`${styles.month} ${isMonthly ? styles.true : styles.false}`}>Monthly</p>
        <label htmlFor="switch">
          <input
            id="switch"
            className={styles.input}
            type="checkbox"
            onChange={handleToggleBillingPlan}
            checked={isMonthly}
          />
          <div className={styles.switch} onChange={handleToggleBillingPlan}>
            <div
              className={styles.trigger}
              style={{
                transform: `translateX(${isMonthly ? 2 : 40}px)`,
                transition: 'transform 0.2s'
              }}
            />
          </div>
        </label>

        <div className={`${styles.year} ${isMonthly ? styles.true : styles.false}`}>
          <span>Yearly</span>
          <span className={styles.info}>(Save up to 60%)</span>
        </div>
      </div>
    </div>
  );
}

export default TrialHeading;
