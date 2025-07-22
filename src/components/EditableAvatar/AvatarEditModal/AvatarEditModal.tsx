import React, { useState } from 'react';
import IconCollection from './IconCollection/IconCollection';
import Modal from '../../../lib/Modal/Modal';
import ImageCroper from './ImageCroper/ImageCroper';
import MainPanel from './MainPanel/MainPanel';
import { AvatarEditPanel } from '../../../types';
import styles from './AvatarEditModal.module.scss';

interface IModalProps {
  close: () => void;
  uploadSuccess: (data: any) => void;
}

export default function ChangeIconModal({ close, uploadSuccess }: IModalProps) {
  const [currentPanel, setCurrentPanel] = useState<AvatarEditPanel>('MAIN');

  return (
    <Modal close={close} header="Add profile photo">
      <div className={styles.modalWidth}>
        {/* Modal body */}
        {currentPanel === 'MAIN' && (
          <MainPanel setCurrentPanel={setCurrentPanel} uploadSuccess={uploadSuccess} />
        )}
        {currentPanel === 'CROPPER' && <ImageCroper />}
        {currentPanel === 'COLLECTION' && <IconCollection setCurrentPanel={setCurrentPanel} />}

        {/* Button set */}
        <div className={styles.buttonSection}>
          <button className={styles.selectBtn} type="button" data-testid="saveIcon" onClick={close}>
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
