import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { AvatarEditPanel } from '../../../../types';
import IconList from '../IconList/IconList';
import styles from './IconCollection.module.scss';

interface IIconCollectionProps {
  setCurrentPanel: (currentPanel: AvatarEditPanel) => void;
}

function IconCollection({ setCurrentPanel }: IIconCollectionProps) {
  return (
    <div className={styles.defaultIconSection}>
      <div className={styles.defaultIconContainer}>
        <div className={styles.defaultIconHeader}>
          <button type="button" className={styles.backBtn} onClick={() => setCurrentPanel('MAIN')}>
            <span>
              <FiArrowLeft />
            </span>
          </button>
          <h4>Default icons</h4>
        </div>
        <ul>
          <IconList />
        </ul>
      </div>
    </div>
  );
}

export default IconCollection;
