import React from 'react';
import { ImCross } from 'react-icons/im';
import styles from './DefaultModalHeader.module.scss';

interface IPropsDefaultModalHeader {
  title: string;
  onClickClose: () => void;
  classesName?: string | string[];
  color?: string;
  defaultPadding?: boolean;
}
export default function DefaultModalHeader(props: IPropsDefaultModalHeader) {
  const {
    onClickClose,
    classesName,
    color = '#4f5366',
    defaultPadding = false,
    title = ''
  } = props;
  return (
    <div
      className={[
        'flex',
        styles.header,
        classesName,
        defaultPadding ? styles.defaultPadding : ''
      ].join(' ')}
    >
      <h1>{title}</h1>
      <ImCross color={color} className={styles.close} onClick={onClickClose} />
    </div>
  );
}

DefaultModalHeader.defaultProps = {
  color: '#4f5366',
  classesName: '',
  defaultPadding: false
};
