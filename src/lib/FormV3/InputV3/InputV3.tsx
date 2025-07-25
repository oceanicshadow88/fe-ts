import React from 'react';
import styles from '../../FormV2/FormV2.module.scss';

interface IInputV3 {
  label: string;
  name: string;
  value: string;
  onValueChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  required?: boolean;
  type?: string;
  error?: string | null;
  dataTestId: string;
  loading?: boolean;
  classes?: string | string[];
}

function InputV3(props: IInputV3) {
  const {
    label,
    name,
    value,
    onValueChanged,
    onValueBlur = () => {},
    placeHolder = '',
    required = false,
    type = 'text',
    error = null,
    dataTestId,
    loading = false,
    classes = ''
  } = props;

  if (loading) {
    return <div className={styles.skeleton} />;
  }

  return (
    <div
      className={['relative', styles.inputContainer, error ? styles.borderRed : '', classes].join(
        ' '
      )}
    >
      <label className={[styles.label, error ? styles.errorRed : ''].join(' ')} htmlFor={name}>
        {label}
        {required ? <span className={styles.errorRed}>*</span> : ''}
      </label>
      <input
        className={styles.input}
        type={type}
        value={value}
        name={name}
        onChange={onValueChanged}
        onBlur={onValueBlur}
        placeholder={placeHolder}
        data-testid={dataTestId}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
export default InputV3;
