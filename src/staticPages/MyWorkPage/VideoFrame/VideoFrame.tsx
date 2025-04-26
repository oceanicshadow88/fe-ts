import React from 'react';
import styles from './VideoFrame.module.scss';

function VideoFrame() {
  return (
    <video
      className={styles.video}
      height="540"
      poster="https://clickup.com/images/poster-images/videos/features/kanban-board/board-view-grouping.png"
      width="960"
      muted
      autoPlay
      playsInline
      loop
    >
      <source
        data-src="https://clickup.com/videos/features/kanban-board/board-view-grouping.mp4"
        type="video/mp4"
        src="https://clickup.com/videos/features/kanban-board/board-view-grouping.mp4"
      />
    </video>
  );
}

export default VideoFrame;
