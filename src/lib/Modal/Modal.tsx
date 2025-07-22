/* eslint-disable no-return-assign */
import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

interface IModal {
  close?: () => void;
  header?: string;
  children?: React.ReactNode;
  classesName?: string;
  fullWidth?: boolean;
}
export default function Modal({ close, header, children, classesName, fullWidth }: IModal) {
  const show = true;
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [show]);

  return (
    <div className={styles.backdrop} onClick={close ?? undefined} aria-hidden="true">
      <div
        className={[styles.modal, fullWidth ? styles.fullWidth : '', classesName].join(' ')}
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-hidden="true"
      >
        <div className={styles.popupBody}>
          {/* Modal header */}
          {header && <h3>{header}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}
Modal.defaultProps = {
  children: null,
  classesName: '',
  fullWidth: false
};
