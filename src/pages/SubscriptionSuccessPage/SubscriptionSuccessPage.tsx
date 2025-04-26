import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SubscriptionSuccessPage.module.scss';

export default function SubscriptionSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/projects`);
    }, 5000);
  });

  const handleButtonClick = () => {
    navigate(`/projects`);
  };

  return (
    <div className={styles.sectionContainer}>
      <h2>Congratulation! you have subscribed our plan</h2>
      <p>You&apos;ll be redirected to your project page</p>
      <button className={styles.button} onClick={handleButtonClick}>
        Go to project
      </button>
      <span className={styles.loader} />
    </div>
  );
}
