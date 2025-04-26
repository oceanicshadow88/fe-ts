import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styles from './MemberItem.module.scss';

interface IMember {
  name: string;
  image: string;
  position: string;
  bulletPoint1: string;
  bulletPoint2: string;
  LinkedinURL: string;
  bulletPoint3: string;
}

export default function MemberItem(props: IMember) {
  const { name, position, bulletPoint1, bulletPoint2, bulletPoint3, LinkedinURL, image } = props;
  return (
    <div className={styles.container}>
      <img src={image} alt={name} />

      <div className={styles.memberContent}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.position}>{position}</span>
        <ul className={styles.bulletPoint1}>
          <li>
            <span>{bulletPoint1}</span>
          </li>
          <li>
            <span>{bulletPoint2}</span>
          </li>
          <li>
            <span>{bulletPoint3}</span>
          </li>
        </ul>
        <div className={styles.LinkLayout}>
          <BsLinkedin className={styles.bsLinkedin} />
          <strong>
            <span>&#58;</span>
          </strong>
          <Link to={LinkedinURL}>{LinkedinURL}</Link>
        </div>
      </div>
    </div>
  );
}
