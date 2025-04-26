import React from 'react';
import styles from './Breakline.module.scss';

interface Props {
  color?: string;
  isCenter?: boolean;
}

function Breakline({ color, isCenter }: Props) {
  return (
    <div
      className={[styles.breakline, styles[color as string], styles[!isCenter ? 'start' : '']].join(
        ' '
      )}
    />
  );
}

Breakline.defaultProps = {
  color: '',
  isCenter: true
};

export default Breakline;
