import React from 'react';
import styles from './ImagePart.module.scss';
import VideoFrame from '../../VideoFrame/VideoFrame';

export default function ImagePart() {
  return (
    <div className={styles.imagePart}>
      <VideoFrame />
    </div>
  );
}
