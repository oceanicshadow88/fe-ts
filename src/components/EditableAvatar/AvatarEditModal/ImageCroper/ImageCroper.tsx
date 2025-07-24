import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import Cropper, { Area, Point } from 'react-easy-crop';
import Slider from 'rc-slider';
import { LuImageMinus, LuImagePlus } from 'react-icons/lu';
import styles from './ImageCroper.module.scss';
import { AvatarEditPanel } from '../../../../types';

interface IImageCroperProps {
  fileImageSrc: string | null;
  setCroppedAreaPixels: (selectedImage: Area | null) => void;
  setCurrentPanel: (currentPanel: AvatarEditPanel) => void;
}

function ImageCroper({
  // eslint-disable-next-line no-unused-vars
  fileImageSrc,
  setCroppedAreaPixels,
  setCurrentPanel
}: IImageCroperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number[] | number>(1);
  const [minZoom, setMinZoom] = useState<number[] | number>(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixelsValue: Area) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  };

  return (
    <div className={styles.panelContainer}>
      {fileImageSrc ? (
        <>
          <RxCross1
            className={styles.crossBtn}
            color="white"
            size={26}
            onClick={() => {
              setCurrentPanel('MAIN');
              setCroppedAreaPixels(null);
            }}
          />
          <Cropper
            classes={{
              containerClassName: styles.cropContainer,
              cropAreaClassName: styles.cropArea
            }}
            cropSize={{ width: 200, height: 200 }}
            image={fileImageSrc}
            crop={crop}
            zoom={zoom as number}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            showGrid={false}
            onMediaLoaded={({ width, height }) => {
              const zoomFactor = 200 / Math.min(width, height);
              setZoom(zoomFactor);
              setMinZoom(zoomFactor);
            }}
          />
        </>
      ) : (
        <div className={styles.skeleton} />
      )}
      <div className={styles.controls}>
        <button
          disabled={!fileImageSrc}
          className={styles.iconBtn}
          type="button"
          onClick={() => setZoom(minZoom)}
        >
          <LuImageMinus />
        </button>
        <div className={styles.slider}>
          <Slider
            disabled={!fileImageSrc}
            value={zoom}
            min={minZoom as number}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            classNames={{
              track: styles.track,
              handle: styles.handle,
              rail: styles.rail
            }}
            onChange={(value: number | number[]) => setZoom(value)}
          />
        </div>
        <button
          disabled={!fileImageSrc}
          className={styles.iconBtn}
          type="button"
          onClick={() => setZoom(3)}
        >
          <LuImagePlus />
        </button>
      </div>
    </div>
  );
}

export default ImageCroper;
