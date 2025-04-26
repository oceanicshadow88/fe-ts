import React, { useEffect, useState } from 'react';
import styles from './CardInput.module.scss';

type IProps = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder?: string;
  regex?: RegExp;
};

export default function CardInput(props: IProps) {
  const { type, value, onChange, disabled, placeholder, regex } = props;
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (regex && value.length) {
      setIsValid(regex.test(value));
    }
    if (!regex && value.length) {
      setIsValid(true);
    }
  }, [regex, value]);

  return (
    <input
      className={isValid ? styles.input : `${styles.input} ${styles.input__error}`}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}

CardInput.defaultProps = {
  placeholder: null,
  regex: null
};
