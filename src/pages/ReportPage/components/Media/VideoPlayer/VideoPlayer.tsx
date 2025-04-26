import React from 'react';
import { capitalise } from '../../../utils';
import styles from './VideoPlayer.module.scss';

interface Props {
  videoSrc: string;
  posterSrc?: string;
  isHaveBackground?: boolean;
  isShowDiamond?: boolean;
  diamondColor?: 'pink' | 'purple' | 'blue' | 'green' | 'yellow' | 'default';
  diamondPosition?: 'left' | 'right' | 'default';
}

function VideoPlayer({
  videoSrc,
  isHaveBackground,
  posterSrc,
  isShowDiamond,
  diamondColor,
  diamondPosition
}: Props) {
  return (
    <div
      className={[
        styles.playerWrapper,
        styles[isHaveBackground ? `playerWrapperWithBg` : ''],
        styles[isShowDiamond ? `playerWrapperWithDiamond` : ''],
        styles[
          isShowDiamond ? `playerWrapperWithDiamond${capitalise(diamondColor as string)}` : ''
        ],
        styles[
          isShowDiamond
            ? `playerWrapperWithDiamondPosition${capitalise(diamondPosition as string)}`
            : ''
        ]
      ].join(' ')}
    >
      <video className={styles.videoPlayer} autoPlay loop muted playsInline poster={posterSrc}>
        <source src={videoSrc} type="video/mp4" />
        <track kind="captions" />
      </video>
    </div>
  );
}

VideoPlayer.defaultProps = {
  isHaveBackground: false,
  posterSrc:
    'https://clickup.com/images/poster-images/videos/features/kanban-board/board-view-agile-inventory.png',
  isShowDiamond: false,
  diamondColor: 'default',
  diamondPosition: 'default'
};

export default VideoPlayer;
