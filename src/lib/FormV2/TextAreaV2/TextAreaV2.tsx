/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { getErrorMessage } from '../../../utils/formUtils';
import styles from '../FormV2.module.scss';

interface ITextAreaV2 {
  onValueChanged: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onValueBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue: string;
  name: string;
  label: string;
  required?: boolean;
  placeHolder?: string;
  dataTestId?: string;
  loading?: boolean;
}

export default function TextAreaV2(props: ITextAreaV2) {
  const {
    defaultValue,
    name,
    label,
    placeHolder,
    required,
    onValueChanged,
    onValueBlur,
    dataTestId
  } = props;
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<null | string>(null);
  const [isActive, setIsActive] = useState(false);

  const onChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const errorMessage = getErrorMessage(e, props);
    setError(errorMessage);
    setValue(e.target.value);
    onValueChanged(e);
  };

  const onBlurValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onValueBlur) {
      onValueBlur(e);
    }
    setIsActive(false);
  };

  return (
    <div
      className={[
        'relative',
        styles.inputContainer,
        error ? styles.borderRed : '',
        isActive ? styles.borderActive : ''
      ].join(' ')}
    >
      <label
        className={[styles.label, error ? styles.errorRed : '', isActive ? styles.active : ''].join(
          ' '
        )}
        htmlFor={name}
      >
        {label}
        {required ? <span className={styles.errorRed}>*</span> : ''}
      </label>
      <textarea
        className={[styles.input, styles.textArea].join(' ')}
        value={value}
        name={name}
        onChange={onChanged}
        onBlur={onBlurValue}
        onClick={() => {
          setIsActive(true);
        }}
        placeholder={placeHolder}
        data-testid={dataTestId}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

TextAreaV2.defaultProps = {
  required: false,
  placeHolder: '',
  onValueBlur: null,
  dataTestId: null,
  loading: false
};
