import React, { useState } from 'react';
import IconCollection from './IconCollection/IconCollection';
import Modal from '../../../lib/Modal/Modal';
import ImageCroper from './ImageCroper/ImageCroper';
import MainPanel from './MainPanel/MainPanel';
import { AvatarEditPanel } from '../../../types';
import styles from './AvatarEditModal.module.scss';

interface IAvatarEditModalProps {
  initialValue?: string;
  addPredefinedIcons: boolean;
  close: () => void;
  uploadSuccess: (data: string) => void;
}

export default function AvatarEditModal({
  initialValue,
  addPredefinedIcons,
  close,
  uploadSuccess
}: IAvatarEditModalProps) {
  const [currentPanel, setCurrentPanel] = useState<AvatarEditPanel>('MAIN');
  const [selectedImage, setSelectedImage] = useState<string | undefined>(initialValue);

  const handleSelect = () => {
    // eslint-disable-next-line no-console
    console.log(selectedImage);
    if (selectedImage) uploadSuccess(selectedImage);
    close();
  };
  return (
    <Modal
      close={close}
      header={addPredefinedIcons ? 'Choose an icon' : 'Add profile photo'}
      zIndex={9999}
    >
      <div className={styles.modalContainer}>
        {/* Modal body */}
        {currentPanel === 'MAIN' && (
          <MainPanel
            initialValue={selectedImage}
            getSelectedImage={setSelectedImage}
            setCurrentPanel={setCurrentPanel}
            addPredefinedIcons={addPredefinedIcons}
          />
        )}
        {currentPanel === 'CROPPER' && <ImageCroper />}
        {currentPanel === 'COLLECTION' && (
          <IconCollection
            initialValue={selectedImage}
            setCurrentPanel={setCurrentPanel}
            getSelectedImage={setSelectedImage}
          />
        )}
        {/* Button set */}
        <div className={styles.buttonSection}>
          <button
            className={styles.selectBtn}
            type="button"
            data-testid="saveIcon"
            onClick={handleSelect}
          >
            Select
          </button>
          <button className={styles.cancelBtn} type="button" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
