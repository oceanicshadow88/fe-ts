import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { AvatarEditPanel } from '../../../../types';
import IconList from '../IconList/IconList';
import styles from './IconCollection.module.scss';

interface IIconCollectionProps {
  getSelectedIcon: (selectedIcon: string) => void;
  setCurrentPanel: (currentPanel: AvatarEditPanel) => void;
}

function IconCollection({ getSelectedIcon, setCurrentPanel }: IIconCollectionProps) {
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
        <IconList getSelectedIcon={getSelectedIcon} />
      </div>
    </div>
  );
}

export default IconCollection;
