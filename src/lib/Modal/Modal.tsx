import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface IModal {
  children?: React.ReactNode;
  classesName?: string;
  backdropClassName?: string;
  fullWidth?: boolean;
}
export default function Modal({ children, classesName, fullWidth }: IModal) {
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

  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <div className={[styles.modal, fullWidth ? styles.fullWidth : '', classesName].join(' ')}>
        {children}
      </div>
    </div>,
    document.body
  );
}
Modal.defaultProps = {
  children: null,
  classesName: '',
  fullWidth: false
};
