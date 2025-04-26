import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import styles from './BottomButton.module.scss';

interface Props {
  btnTitle: string;
  trailingIcon?: JSX.Element;
  isShowIcon?: boolean;
}

function CardFooterWrapper({ btnTitle, trailingIcon, isShowIcon }: Props) {
  return (
    <button className={styles.cardFooterWrapper}>
      {btnTitle}
      {isShowIcon && trailingIcon}
    </button>
  );
}

CardFooterWrapper.defaultProps = {
  isShowIcon: true,
  trailingIcon: <HiArrowNarrowRight color="#7b68ee" size={20} />
};

export default CardFooterWrapper;
