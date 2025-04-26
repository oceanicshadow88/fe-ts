import React from 'react';
import styles from './DemoVideo.module.scss';

type Props = { src: string };

function DemoVideo({ src }: Props) {
  return (
    <video className={styles.videoStyle} autoPlay loop muted playsInline>
      <source type="video/mp4" src={src} />
    </video>
  );
}

export default DemoVideo;
