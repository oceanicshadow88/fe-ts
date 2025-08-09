import React, { useEffect, useState } from 'react';
import { GoAlertFill } from 'react-icons/go';
import { Area } from 'react-easy-crop';
import { toast } from 'react-toastify';
import IconCollection from './IconCollection/IconCollection';
import Modal from '../../../lib/Modal/Modal';
import ImageCroper from './ImageCroper/ImageCroper';
import MainPanel from './MainPanel/MainPanel';
import { AvatarEditPanel, IUploadImageResponse } from '../../../types';
import styles from './AvatarEditModal.module.scss';
import { upload } from '../../../api/upload/upload';
import { getCroppedImg } from '../../../utils/imageProcessor';
import DefaultModalBody from '../../../lib/Modal/ModalBody/DefaultModalHeader/DefaultModalBody';
import DefaultModalHeader from '../../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
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
  const [fileImageSrc, setFileImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);

  const getUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = (await readFile(file)) as string;
      setFileImageSrc(imageDataUrl);
    }
  };

  const uploadCroppedImage = async (): Promise<string> => {
    try {
      if (fileImageSrc && croppedAreaPixels) {
        const croppedImageTmp = await getCroppedImg(fileImageSrc, croppedAreaPixels);
        if (croppedImageTmp) {
          const data = new FormData();
          data.append('photos', croppedImageTmp);
          const res = (await upload(data)) as IUploadImageResponse;
          const imageUrl = res.data[0]?.location;
          return imageUrl;
        }
      }
      throw new Error('cropped Image Cannot be empty.');
    } catch (e: any) {
      toast.error(`Error occured when cropping the image: ${e?.message}`);
      return '';
    }
  };

  const handleSelect = async () => {
    if (currentPanel === 'MAIN' || currentPanel === 'COLLECTION') {
      if (selectedImage) {
        if (selectedImage !== initialValue) {
          uploadSuccess(selectedImage);
        }
        close();
      } else {
        setShowErrorMsg(true);
      }
    } else if (currentPanel === 'CROPPER') {
      const imageUrl = await uploadCroppedImage();
      if (imageUrl) {
        uploadSuccess(imageUrl);
        close();
      }
    }
  };

  useEffect(() => {
    const handleClick = () => {
      setShowErrorMsg(false);
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <Modal>
      <DefaultModalHeader
        title={addPredefinedIcons ? 'Choose an icon' : 'Add profile photo'}
        onClickClose={close}
      />
      <DefaultModalBody defaultPadding={false} classesName={styles.modalPadding}>
        <div className={styles.modalContainer}>
          {showErrorMsg && (
            <div className={styles.errorMsg}>
              <GoAlertFill color="white" size={26} />
              <p>Upload a photo {addPredefinedIcons && 'or select from some default options'}</p>
            </div>
          )}
          {/* Modal body */}
          {currentPanel === 'MAIN' && (
            <MainPanel
              getUploadFile={getUploadFile}
              initialValue={selectedImage}
              getSelectedImage={setSelectedImage}
              setCurrentPanel={setCurrentPanel}
              addPredefinedIcons={addPredefinedIcons}
            />
          )}
          {currentPanel === 'CROPPER' && (
            <ImageCroper
              fileImageSrc={fileImageSrc}
              setCroppedAreaPixels={setCroppedAreaPixels}
              setCurrentPanel={setCurrentPanel}
            />
          )}
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
      </DefaultModalBody>
    </Modal>
  );
}
