import React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
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
  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': [] },
    noClick: true,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      const mockEvent = {
        target: {
          files: acceptedFiles
        }
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      getUploadFile(mockEvent);
      setCurrentPanel('CROPPER');
    }
  });

  return (
    <div className={styles.mainContainer}>
      <div className={styles.uploadOptions}>
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getRootProps({
            className: clsx(styles.dragCircle, {
              [styles.accept]: isDragAccept,
              [styles.reject]: isDragReject
            })
          })}
        >
          <input
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getInputProps()}
          />
          <img src={uploadImage} alt="upload icon" />
          <p>Drag and drop images here</p>
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
              setCurrentPanel('CROPPER');
            }}
          />
        </label>
      </div>
      {addPredefinedIcons && (
        <div className={styles.photoCollection}>
          <IconList
            startIndex={0}
            endIndex={5}
            getSelectedIcon={getSelectedImage}
            initialValue={initialValue}
          />
          <button type="button" onClick={() => setCurrentPanel('COLLECTION')}>
            <RiMoreFill size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPanel;
