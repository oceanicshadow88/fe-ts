import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { capitalise } from '../../../utils';
import styles from './PrimaryButton.module.scss';

interface Props {
  btnTitle: string;
  btnBackgroundColor?: 'green' | 'brand' | 'blue' | 'pink' | 'default' | 'inherit' | '';
  isFullWidth?: boolean;
  trailingIcon?: JSX.Element;
  isShowIcon?: boolean;
}

function PrimaryButton({
  btnTitle,
  btnBackgroundColor,
  isFullWidth,
  trailingIcon,
  isShowIcon
}: Props) {
  return (
    <button
      className={[
        styles.buttonPrimary,
        styles[`btnColor${capitalise(btnBackgroundColor as string)}`],
        styles[isFullWidth ? 'btnFullWidth' : '']
      ].join(' ')}
    >
      {btnTitle}
      {isShowIcon && trailingIcon}
    </button>
  );
}

PrimaryButton.defaultProps = {
  btnBackgroundColor: 'default',
  isFullWidth: false,
  isShowIcon: false,
  trailingIcon: <HiArrowNarrowRight color="#fff" size={20} />
};

export default PrimaryButton;
