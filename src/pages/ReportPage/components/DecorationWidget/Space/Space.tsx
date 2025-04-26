import React from 'react';
import styles from './Space.module.scss';

interface Props {
  power?: number;
}

function Space({ power }: Props) {
  return <div className={[styles.space, styles[`spacex${power}`]].join(' ')} />;
}

Space.defaultProps = {
  power: 1
};

export default Space;
