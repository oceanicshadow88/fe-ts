/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IMinEvent, IOptions } from '../../../types';
import { getErrorMessage } from '../../../utils/formUtils';
import styles from '../FormV2.module.scss';
import defaultStyles from './DropdownV2.module.scss';

interface IDropdownV2 {
  onValueChanged: (e: IMinEvent) => void;
  onValueBlur?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  value?: string | null;
  name: string;
  options: IOptions[];
  label: string;
  required?: boolean;
  placeHolder?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  dataTestId?: string;
  hasBorder?: boolean;
  addNullOptions?: boolean;
  color?: string;
  className?: string;
}

export default function DropdownV2(props: IDropdownV2) {
  const {
    value,
    name,
    label,
    placeHolder,
    type = 'button',
    required,
    options,
    onValueChanged,
    onValueBlur = null,
    loading = false,
    dataTestId,
    hasBorder = true,
    addNullOptions = false,
    color,
    className
  } = props;
  const defaultPlaceHolder = placeHolder ?? 'None';
  const [error, setError] = useState<null | string>(null);
  const [isActive, setIsActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const finalValue = options?.filter((item) => item.value === value)[0]?.label;

  const onChangeSelect = (val: string | null) => {
    const e = { target: { value: val, name } };
    const errorMessage = getErrorMessage(e.target.value, props);
    setError(errorMessage);
    onValueChanged(e);
    setShowMenu(false);
    setIsActive(false);
  };

  const onBlurValue = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (onValueBlur) {
      onValueBlur(e);
    }
    const errorMessage = getErrorMessage(e.target.value, props);
    setError(errorMessage);
    setIsActive(false);
  };

  if (loading) {
    return <div className={styles.skeleton} />;
  }

  const renderDropdown = () => {
    if (!showMenu) {
      return <></>;
    }
    return (
      <div className="relative">
        <div className={defaultStyles.dropDownList}>
          {addNullOptions && (
            <button onClick={() => onChangeSelect(null)} data-testid="leader-name-null">
              None
            </button>
          )}
          {options.length > 0 &&
            options
              .filter((item) => item.value !== value)
              .map((item) => {
                return (
                  <button
                    key={item.value}
                    onClick={() => onChangeSelect(item.value)}
                    data-testid={`leader-name-${item.label}`}
                  >
                    {item.label}
                  </button>
                );
              })}
        </div>
      </div>
    );
  };
  const borderCss = hasBorder ? styles.inputContainer : styles.inputContainerNoBorder;
  const hasContainer = hasBorder ? defaultStyles.dropDownListContainer : '';
  const placeHolderCss = hasBorder ? defaultStyles.placeHolder : defaultStyles.placeHolderNoBorder;
  const textStyle = !finalValue ? placeHolderCss : defaultStyles.val;
  return (
    <div
      className={[
        'relative',
        borderCss,
        hasContainer,
        isActive ? styles.borderActive : '',
        error ? styles.borderRed : '',
        className
      ].join(' ')}
      data-testid={dataTestId}
    >
      <div
        onClick={() => {
          setShowMenu(!showMenu);
          setIsActive(true);
        }}
      >
        {hasBorder && (
          <label
            className={[
              styles.label,
              error ? styles.errorRed : '',
              isActive ? styles.active : ''
            ].join(' ')}
            htmlFor={name}
          >
            {label}
            {required ? <span className={styles.errorRed}>*</span> : ''}
          </label>
        )}
        <button
          type={type}
          className={[styles.input, !value ? styles.lightGrey : ''].join(' ')}
          onBlur={onBlurValue}
        >
          <p className={[textStyle].join(' ')} style={color ? { color } : undefined}>
            {!finalValue ? defaultPlaceHolder : finalValue}
          </p>
        </button>
        {hasBorder && <RiArrowDropDownLine className={defaultStyles.dropDown} />}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      {renderDropdown()}
    </div>
  );
}

DropdownV2.defaultProps = {
  required: false,
  placeHolder: '',
  type: 'button',
  onValueBlur: null,
  value: '',
  loading: false,
  dataTestId: null
};
