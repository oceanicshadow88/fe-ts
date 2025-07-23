import React, { useState } from 'react';
import IconCollection from './IconCollection/IconCollection';
import Modal from '../../../lib/Modal/Modal';
import ImageCroper from './ImageCroper/ImageCroper';
import MainPanel from './MainPanel/MainPanel';
import { AvatarEditPanel } from '../../../types';
import styles from './AvatarEditModal.module.scss';

interface IAvatarEditModalProps {
  addPredefinedIcons: boolean;
  close: () => void;
  uploadSuccess: (data: any) => void;
}

export default function AvatarEditModal({
  addPredefinedIcons,
  close,
  uploadSuccess
}: IAvatarEditModalProps) {
  const [currentPanel, setCurrentPanel] = useState<AvatarEditPanel>('MAIN');
  const [selectedIconPhoto, setSelectedIconPhoto] = useState<string | undefined>(undefined);

  const handleSelect = () => {
    // eslint-disable-next-line no-console
    console.log(selectedIconPhoto);
    uploadSuccess(selectedIconPhoto);
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
            getSelectedIcon={setSelectedIconPhoto}
            setCurrentPanel={setCurrentPanel}
            uploadSuccess={uploadSuccess}
            addPredefinedIcons={addPredefinedIcons}
          />
        )}
        {currentPanel === 'CROPPER' && <ImageCroper />}
        {currentPanel === 'COLLECTION' && (
          <IconCollection
            setCurrentPanel={setCurrentPanel}
            getSelectedIcon={setSelectedIconPhoto}
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
