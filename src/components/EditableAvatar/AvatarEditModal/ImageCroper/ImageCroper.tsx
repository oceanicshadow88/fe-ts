import React, { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import Slider from 'rc-slider';
import styles from './ImageCroper.module.scss';

interface IImageCroperProps {
  fileImageSrc: string | null;
  setCroppedAreaPixels: (selectedImage: Area | null) => void;
}
function ImageCroper({ fileImageSrc, setCroppedAreaPixels }: IImageCroperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number[] | number>(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixelsValue: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  };

  return (
    <div>
      {fileImageSrc && (
        <>
          <div className={styles.cropContainer}>
            <Cropper
              image={fileImageSrc}
              crop={crop}
              zoom={zoom as number}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className={styles.controls}>
            <div className={styles.sliderContainer}>
              <p>Zoom</p>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(value: number | number[]) => setZoom(value)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCroper;
