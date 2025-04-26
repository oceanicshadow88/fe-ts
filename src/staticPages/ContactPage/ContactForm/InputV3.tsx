/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import styles from './InputV3.module.scss';

type TInputV3 = {
  value: string;
  identifier: string;
  label: string;
  tagType?: 'input' | 'textarea';
  type?: 'text' | 'email' | 'password' | 'tel';
  required?: boolean;
  placeHolder?: string;
  regex?: RegExp;
  errMsg?: string;
  classes?: string | string[];
} & (
  | {
      tagType?: 'input';
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
  | {
      tagType: 'textarea';
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    }
);

export default function InputV3(props: TInputV3) {
  const {
    value,
    onChange,
    label,
    identifier,
    type,
    tagType,
    required,
    placeHolder,
    regex,
    errMsg,
    classes
  } = props;

  const [isValid, setIsValid] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (regex && value.length) {
      setIsValid(regex.test(value));
    }
    if (!regex && value.length) {
      setIsValid(true);
    }
    if (value.length) {
      setIsFocused(true);
    }
  }, [regex, value]);

  const onBlurHandler = () => {
    if (!value) {
      setIsFocused(false);
      setIsValid(false);
    }
  };

  return (
    <>
      <div className={[styles.inputField, classes].join(' ')}>
        <label
          htmlFor={identifier}
          className={isFocused ? `${styles.label} ${styles.label__focused}` : styles.label}
        >
          {label}
        </label>
        {tagType === 'input' && (
          <input
            id={identifier}
            className={isValid ? styles.input : `${styles.input} ${styles.input__error}`}
            type={type}
            data-cy={`${identifier}-input`}
            value={value}
            placeholder={placeHolder}
            autoComplete="off"
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={onBlurHandler}
            aria-invalid={isValid ? 'false' : 'true'}
            aria-describedby={`${identifier}-accessible-msg`}
            required={required}
          />
        )}
        {tagType === 'textarea' && (
          <textarea
            id={identifier}
            className={isValid ? styles.input : `${styles.input} ${styles.input__error}`}
            data-cy={`${identifier}-input`}
            value={value}
            autoComplete="off"
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={onBlurHandler}
            aria-invalid={isValid ? 'false' : 'true'}
            aria-describedby={`${identifier}-accessible-msg`}
            required={required}
          />
        )}
      </div>
      {!isValid && (
        <p id={`${identifier}-accessible-msg`} className={styles.errMsg}>
          {errMsg}
        </p>
      )}
    </>
  );
}

InputV3.defaultProps = {
  required: false,
  placeHolder: null,
  tagType: 'input',
  type: 'text',
  regex: null,
  errMsg: null,
  classes: null
};
