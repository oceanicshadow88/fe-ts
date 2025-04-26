import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './VisualizeSection.module.scss';
import VisualizeCard from './VisualizeCard/VisualizeCard';
import { VISUALIZE_CARD_TEXT } from '../constant';

function VisualizeSection() {
  return (
    <div className={styles.visualizeSection}>
      <p className={styles.subHeader}>visualize</p>
      <h2 className={styles.header}>Organize work and assess bandwidth</h2>
      <div className={styles.cardsWrapper}>
        {VISUALIZE_CARD_TEXT.map((item) => (
          <VisualizeCard
            key={uuidv4()}
            listTitle={item.listTitle}
            listItemText={item.listItemText}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default VisualizeSection;
