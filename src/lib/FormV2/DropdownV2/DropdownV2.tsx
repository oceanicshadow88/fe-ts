/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
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
}

export interface IDropdownV2Handle {
  validate: () => boolean;
}
const DropdownV2 = forwardRef<IDropdownV2Handle, IDropdownV2>((props, ref) => {
  const {
    value = '',
    name,
    label,
    placeHolder = '',
    type = 'button',
    required = false,
    options,
    onValueChanged,
    onValueBlur = null,
    loading = false,
    dataTestId = null,
    hasBorder = true,
    addNullOptions = false,
    color
  } = props;
  const defaultPlaceHolder = placeHolder ?? 'None';
  const [error, setError] = useState<null | string>(null);
  const [isActive, setIsActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const finalValue = options?.find((item) => item?.value?.toString() === value?.toString())?.label;

  const checkError = (targetValue = value ?? '') => {
    const errorMessage = getErrorMessage(targetValue, props);
    setError(errorMessage);
    return errorMessage === null;
  };

  useImperativeHandle(ref, () => ({
    validate: () => checkError(finalValue)
  }));

  const onChangeSelect = (val: string | null) => {
    const e = { target: { value: val, name } };
    checkError(val ?? '');
    onValueChanged(e);
    setShowMenu(false);
    setIsActive(false);
  };

  const onBlurValue = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (onValueBlur) {
      onValueBlur(e);
    }
    setIsActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
        setShowMenu(false);
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <GoDotFill className={value === null ? undefined : defaultStyles.dotIcon} />
              None
            </button>
          )}
          {options.length > 0
            ? options.map((item) => {
                return (
                  <button
                    key={item.value}
                    className={item.value === value ? defaultStyles.selected : undefined}
                    onClick={() => onChangeSelect(item.value)}
                    data-testid={`leader-name-${item.label}`}
                  >
                    <GoDotFill
                      className={item.value === value ? undefined : defaultStyles.dotIcon}
                    />
                    {item.label}
                  </button>
                );
              })
            : !addNullOptions && (
                <button onClick={() => onChangeSelect(null)} data-testid="leader-name-null">
                  No Content
                </button>
              )}
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
      ref={dropDownRef}
      className={[
        'relative',
        borderCss,
        hasContainer,
        isActive ? styles.borderActive : '',
        error ? styles.borderRed : ''
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
            {finalValue ?? defaultPlaceHolder}
          </p>
        </button>
        {hasBorder && <RiArrowDropDownLine className={defaultStyles.dropDown} />}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      {renderDropdown()}
    </div>
  );
});
export default DropdownV2;
