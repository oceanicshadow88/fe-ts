import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { RiMoreFill } from 'react-icons/ri';
import styles from './ChangeIconModal.module.scss';
import uploadImage from '../../../../../assets/uploadImage.png';
import { upload } from '../../../../../api/upload/upload';

interface IModalProps {
  shown: boolean;
  close: () => void;
  uploadSuccess: (data: any) => void;
}

export default function ChangeIconModal({ shown, close, uploadSuccess }: IModalProps) {
  const icons = [
    {
      id: 1,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10411&avatarType=project'
    },
    {
      id: 2,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10400&avatarType=project'
    },
    {
      id: 3,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10401&avatarType=project'
    },
    {
      id: 4,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10402&avatarType=project'
    },
    {
      id: 5,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10403&avatarType=project'
    },
    {
      id: 6,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10404&avatarType=project'
    },
    {
      id: 7,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10405&avatarType=project'
    },
    {
      id: 8,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10406&avatarType=project'
    },
    {
      id: 9,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10407&avatarType=project'
    },
    {
      id: 10,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10408&avatarType=project'
    },
    {
      id: 11,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10409&avatarType=project'
    },
    {
      id: 12,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10410&avatarType=project'
    },
    {
      id: 13,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10415&avatarType=project'
    },
    {
      id: 14,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10412&avatarType=project'
    },
    {
      id: 15,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10413&avatarType=project'
    },
    {
      id: 16,
      photo:
        'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10414&avatarType=project'
    }
  ];
  const firstFiveIcons = icons.slice(0, 5);
  const fiveIcons = firstFiveIcons.map((firstFiveIcon) => (
    <li key={firstFiveIcon.id}>
      <img src={firstFiveIcon.photo} alt="icon" />
    </li>
  ));

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const data = new FormData();
    data.append('photos', e.target.files[0]);
    upload(data).then((res: any) => {
      uploadSuccess(res.data);
    });
  };

  const listIcons = icons.map((icon) => (
    <li key={icon.id}>
      <img src={icon.photo} alt="icon" />
    </li>
  ));
  const [iconCollection, setIconCollection] = useState(false);
  return shown ? (
    <div className={styles.modalBackdrop} onClick={close} aria-hidden="true">
      <div
        className={styles.modalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-hidden="true"
      >
        <div className={styles.popupPage}>
          <div className={styles.popupSection}>
            <div className={styles.popupWindow}>
              <h3>Choose an icon</h3>
              {iconCollection ? (
                <div className={styles.defaultIconSection}>
                  <div className={styles.defaultIconContainer}>
                    <div className={styles.defaultIconHeader}>
                      <button
                        type="button"
                        className={styles.backBtn}
                        onClick={() => setIconCollection(false)}
                      >
                        <span>
                          <FiArrowLeft />
                        </span>
                      </button>
                      <h4>Default icons</h4>
                    </div>
                    <ul>{listIcons}</ul>
                  </div>
                </div>
              ) : (
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
                            onChange={uploadFile}
                          />
                        </label>
                      </div>
                    </div>
                    <div className={styles.photoCollection} style={{ display: 'none' }}>
                      <div className={styles.iconList}>
                        <ul>{fiveIcons}</ul>
                      </div>
                      <button type="button" onClick={() => setIconCollection(true)}>
                        <span>
                          <RiMoreFill />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.buttonSection}>
                <button
                  className={styles.selectBtn}
                  type="button"
                  data-testid="saveIcon"
                  onClick={close}
                >
                  Select
                </button>
                <button className={styles.cancelBtn} type="button" onClick={close}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
