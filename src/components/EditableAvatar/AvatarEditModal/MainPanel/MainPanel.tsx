import React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { upload } from '../../../../api/upload/upload';
import uploadImage from '../../../../assets/uploadImage.png';
import styles from './MainPanel.module.scss';
import IconList from '../IconList/IconList';
import { AvatarEditPanel } from '../../../../types';

interface IMainPanelProps {
  setCurrentPanel: (currentPanel: AvatarEditPanel) => void;
  uploadSuccess: (data: any) => void;
}

function MainPanel({ setCurrentPanel, uploadSuccess }: IMainPanelProps) {
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const data = new FormData();
    data.append('photos', e.target.files[0]);
    upload(data).then((res: any) => {
      uploadSuccess(res.data);
    });
  };
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
                name="Upload a photo"
                data-testid="picInput"
                style={{ display: 'none' }}
                onChange={handleUploadFile}
              />
            </label>
          </div>
        </div>
        <div className={styles.photoCollection}>
          <div className={styles.iconList}>
            <ul>
              <IconList startIndex={0} endIndex={5} />
            </ul>
          </div>
          <button type="button" onClick={() => setCurrentPanel('COLLECTION')}>
            <span>
              <RiMoreFill />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPanel;
