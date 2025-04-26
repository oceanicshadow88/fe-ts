import React from 'react';
import styles from './Button.module.scss';

export interface IButton {
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  overrideStyle?: string;
  onClick?: () => void;
  onMouseEnter?: (e) => void;
  children?: React.ReactNode | string;
  dataTestId?: string;
}

export default function Button({
  icon,
  iconPosition = 'start',
  overrideStyle,
  onClick,
  onMouseEnter,
  children,
  dataTestId
}: IButton) {
  return (
    <button
      className={`${styles.buttonContainer} ${
        iconPosition === 'start' ? '' : styles.rowReversed
      } ${overrideStyle}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      data-testid={dataTestId}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
}

Button.defaultProps = {
  icon: null,
  iconPosition: 'start',
  overrideStyle: '',
  onClick: null,
  onMouseEnter: null,
  children: null
};
