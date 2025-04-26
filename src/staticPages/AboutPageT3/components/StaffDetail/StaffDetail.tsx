import React from 'react';
import { AiFillCloseSquare, AiFillLinkedin } from 'react-icons/ai';
import styles from './StaffDetail.module.scss';
import MaleAvatar from '../../../../assets/team2/male_avatar.svg';
import FemaleAvatar from '../../../../assets/team2/female_avatar.svg';

interface IStaff {
  name: string;
  image?: string;
  description?: string;
  linkedin?: string;
  gender: string;
  position: string;
  closeDetail: () => void;
}

function StaffDetail(props: IStaff) {
  const { name, image, gender, position, description, linkedin, closeDetail } = props;
  const imageShow = image || (gender === 'male' ? MaleAvatar : FemaleAvatar);
  return (
    <div className={styles['intro-container']}>
      <div className={styles.closeBtn} role="presentation">
        <AiFillCloseSquare onClick={closeDetail} style={{ fontSize: '50px' }} />
      </div>
      <div className={styles['inner-container']}>
        <div className={styles['detail-img']}>
          <img className={styles.staffImg} src={imageShow} alt={name} />
        </div>
        <div className={styles['detail-header']}>
          <h3 className={styles.staffName}>{name}</h3>
          <h4 className={styles.position}>{position}</h4>
        </div>
        <div className={styles['detail-intro']}>
          <p>{description}</p>
        </div>
        <div className={styles['icon-container']}>
          <a href={linkedin} className={styles.icon}>
            <AiFillLinkedin style={{ fontSize: '35px', color: '#868e96' }} />
          </a>
        </div>
      </div>
    </div>
  );
}

StaffDetail.defaultProps = {
  image: undefined,
  description: undefined,
  linkedin: undefined
};

export default StaffDetail;
