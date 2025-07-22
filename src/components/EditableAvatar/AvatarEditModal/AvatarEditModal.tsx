import React, { useState } from 'react';
import IconCollection from './IconCollection/IconCollection';
import Modal from '../../../lib/Modal/Modal';
import ImageCroper from './ImageCroper/ImageCroper';
import MainPanel from './MainPanel/MainPanel';
import { AvatarEditPanel } from '../../../types';
import styles from './AvatarEditModal.module.scss';

interface IModalProps {
  addPredefinedIcons: boolean;
  close: () => void;
  uploadSuccess: (data: any) => void;
}

export default function ChangeIconModal({ addPredefinedIcons, close, uploadSuccess }: IModalProps) {
  const [currentPanel, setCurrentPanel] = useState<AvatarEditPanel>('MAIN');
  const [selectedIconPhoto, setSelectedIconPhoto] = useState<string | undefined>(undefined);

  const handleSelect = () => {
    // eslint-disable-next-line no-console
    console.log(selectedIconPhoto);
    uploadSuccess(selectedIconPhoto);
    close();
  };
  return (
    <Modal close={close} header={addPredefinedIcons ? 'Choose an icon' : 'Add profile photo'}>
      <div className={styles.modalWidth}>
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
