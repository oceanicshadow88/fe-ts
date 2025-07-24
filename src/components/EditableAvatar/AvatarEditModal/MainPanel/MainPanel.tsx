import React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import uploadImage from '../../../../assets/uploadImage.png';
import styles from './MainPanel.module.scss';
import IconList from '../IconList/IconList';
import { AvatarEditPanel } from '../../../../types';

interface IMainPanelProps {
  initialValue?: string;
  addPredefinedIcons: boolean;
  getUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getSelectedImage: (selectedImage: string) => void;
  setCurrentPanel: (currentPanel: AvatarEditPanel) => void;
}

function MainPanel({
  initialValue,
  addPredefinedIcons,
  setCurrentPanel,
  getUploadFile,
  getSelectedImage
}: IMainPanelProps) {
  return (
    <div className={styles.uploadSection}>
      <div className={styles.uploadContainer}>
        <div className={styles.uploadOptions}>
          <div className={styles.dragArea}>
            <div className={styles.dragCircle}>
              <img src={uploadImage} alt="upload icon" />
              <span>Drag and drop your images here</span>
            </div>
            <p>or</p>
            <label htmlFor="uploadPhoto">
              Upload a photo
              <input
                id="uploadPhoto"
                type="file"
                accept="image/*"
                name="Upload a photo"
                data-testid="picInput"
                style={{ display: 'none' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  getUploadFile(e);
                  // eslint-disable-next-line no-console
                  console.log(e);
                  setCurrentPanel('CROPPER');
                }}
              />
            </label>
          </div>
        </div>
        {addPredefinedIcons && (
          <div className={styles.photoCollection}>
            <div className={styles.iconList}>
              <IconList
                startIndex={0}
                endIndex={5}
                getSelectedIcon={getSelectedImage}
                initialValue={initialValue}
              />
            </div>
            <button type="button" onClick={() => setCurrentPanel('COLLECTION')}>
              <span>
                <RiMoreFill />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPanel;
