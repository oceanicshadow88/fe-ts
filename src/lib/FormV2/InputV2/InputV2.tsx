/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import { getErrorMessage } from '../../../utils/formUtils';
import styles from '../FormV2.module.scss';

interface IInputV2 {
  onValueChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  name: string;
  label: string;
  required?: boolean;
  placeHolder?: string;
  type?: string;
  min?: number;
  max?: number;
  dataTestId: string;
  loading?: boolean;
  classes?: string | string[];
  value?: string;
}

export default function InputV2(props: IInputV2) {
  const {
    defaultValue,
    name,
    label,
    placeHolder,
    type,
    required,
    onValueChanged,
    onValueBlur,
    dataTestId,
    loading = false,
    classes,
    value
  } = props;
  const [val, setVal] = useState(defaultValue);
  const [hadDefaultValue, setHadDefaultValue] = useState(value === null);
  const [error, setError] = useState<null | string>(null);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (value !== null) {
      setHadDefaultValue(false);
    }
  }, [value]);

  const onChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const errorMessage = getErrorMessage(e.target.value, props);
    setError(errorMessage);
    if (hadDefaultValue) {
      setVal(e.target.value);
    }
    onValueChanged(e);
  };

  const onBlurValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueBlur) {
      onValueBlur(e);
    }
    setIsActive(false);
  };

  useEffect(() => {
    if (!loading) {
      setVal(defaultValue ?? '');
    }
  }, [loading]);

  if (loading) {
    return <div className={styles.skeleton} />;
  }

  return (
    <div
      className={[
        'relative',
        styles.inputContainer,
        error ? styles.borderRed : '',
        isActive ? styles.borderActive : '',
        classes
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
      <input
        className={[styles.input].join(' ')}
        type={type}
        value={hadDefaultValue ? val ?? '' : value ?? ''}
        name={name}
        onChange={onChanged}
        onBlur={onBlurValue}
        placeholder={placeHolder}
        onClick={() => {
          setIsActive(true);
        }}
        data-testid={dataTestId}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

InputV2.defaultProps = {
  required: false,
  placeHolder: '',
  type: 'text',
  min: null,
  max: null,
  onValueBlur: null,
  loading: false,
  classes: null,
  value: null,
  defaultValue: null
};
