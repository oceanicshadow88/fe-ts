import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './VisualizeCard.module.scss';

export interface IVisualizeCard {
  listTitle: string;
  listItemText: string[];
  imageUrl: string;
}

function VisualizeCard(props: IVisualizeCard) {
  const { listTitle, listItemText, imageUrl } = props;
  return (
    <div className={styles.visualizeCard}>
      <div className={styles.cardImgWrapper}>
        <img
          className={styles.cardImg}
          alt="Stay on track with sorting and filtering."
          height="657"
          src={imageUrl}
          width="960"
          draggable="false"
        />
      </div>
      <h3 className={styles.cardHeader}>{listTitle}</h3>
      <ul className={styles.list}>
        {listItemText.map((item) => (
          <li key={uuidv4()} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VisualizeCard;
