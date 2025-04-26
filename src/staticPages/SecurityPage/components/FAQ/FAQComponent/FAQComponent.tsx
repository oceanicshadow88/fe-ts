import React, { useState } from 'react';
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import styles from './FAQComponent.module.scss';

interface Imember {
  title: string;
  content: string;
}

export default function FAQComponent(props: Imember) {
  const { title, content } = props;
  const [display, setDisplay] = useState(false);
  const icon = display ? (
    <FaRegMinusSquare className={styles.plusIcon} />
  ) : (
    <FaRegPlusSquare className={styles.plusIcon} />
  );

  function toggleDisplay() {
    setDisplay(!display);
  }

  return (
    <>
      <div
        className={styles.faqDetailes}
        role="button"
        tabIndex={0}
        onClick={() => {
          toggleDisplay();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            toggleDisplay();
          }
        }}
      >
        <div className={styles.questionContainer}>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className={styles.iconContainer}>{icon}</div>
      </div>
      <hr className={styles.breaker} />
      <div className={display ? styles.expand : styles.hide}>
        <p>{content}</p>
      </div>
    </>
  );
}
