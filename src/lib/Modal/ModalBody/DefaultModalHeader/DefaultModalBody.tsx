import React from 'react';
import styles from './DefaultModalBody.module.scss';

interface IPropsDefaultModalBody {
  defaultPadding?: boolean;
  classesName?: string | string[];
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export default function DefaultModalBody(props: IPropsDefaultModalBody) {
  const { classesName, defaultPadding = true, fullWidth, children = null } = props;
  return (
    <div
      className={[
        defaultPadding ? styles.defaultPadding : '',
        fullWidth ? styles.fullWidth : '',
        classesName
      ].join(' ')}
    >
      {children}
    </div>
  );
}

DefaultModalBody.defaultProps = {
  classesName: '',
  defaultPadding: true,
  children: null,
  fullWidth: false
};
