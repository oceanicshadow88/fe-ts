/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { IMinEvent, IOptions } from '../../../types';
import styles from '../../FormV2/FormV2.module.scss';
import defaultStyles from '../../FormV2/DropdownV2/DropdownV2.module.scss';

interface IDropdownV3 {
  label: string;
  name: string;
  value?: string | null;
  options: IOptions[];
  onValueChanged: (e: IMinEvent) => void;
  onValueBlur?: (e: React.ChangeEvent<HTMLButtonElement>) => void;
  placeHolder?: string;
  required?: boolean;
  type?: 'button' | 'submit' | 'reset';
  error?: string | null;
  loading?: boolean;
  hasBorder?: boolean;
  dataTestId?: string;
  color?: string;
  addNullOptions?: boolean;
}

function DropdownV3(props: IDropdownV3) {
  const {
    value = '',
    name,
    label,
    placeHolder = 'None',
    type = 'button',
    error = null,
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

  const [isActive, setIsActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const finalValue = options?.find((item) => item?.value?.toString() === value?.toString())?.label;

  const handleSelect = (val: string | null) => {
    const e = { target: { value: val, name } };
    onValueChanged(e);
    setShowMenu(false);
    setIsActive(false);
  };

  const handleValueBlur = (e: React.ChangeEvent<HTMLButtonElement>) => {
    onValueBlur?.(e);
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
    return (
      showMenu && (
        <div className="relative">
          <div className={defaultStyles.dropDownList}>
            {addNullOptions && (
              <button onClick={() => handleSelect(null)} data-testid="leader-name-null">
                <GoDotFill className={value === null ? undefined : defaultStyles.dotIcon} />
                None
              </button>
            )}
            {options?.length > 0
              ? options.map((item) => {
                  return (
                    <button
                      key={item.value}
                      className={item.value === value ? defaultStyles.selected : undefined}
                      onClick={() => handleSelect(item.value)}
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
                  <button onClick={() => handleSelect(null)} data-testid="leader-name-null">
                    No Content
                  </button>
                )}
          </div>
        </div>
      )
    );
  };
  const placeHolderCss = hasBorder ? defaultStyles.placeHolder : defaultStyles.placeHolderNoBorder;
  const textStyle = finalValue ? defaultStyles.val : placeHolderCss;

  return (
    <div
      ref={dropDownRef}
      className={[
        'relative',
        hasBorder ? styles.inputContainer : styles.inputContainerNoBorder,
        hasBorder && defaultStyles.dropDownListContainer,
        isActive && styles.borderActive,
        error && styles.borderRed
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
            className={[styles.label, error && styles.errorRed, isActive && styles.active].join(
              ' '
            )}
            htmlFor={name}
          >
            {label}
            {required && <span className={styles.errorRed}>*</span>}
          </label>
        )}
        <button
          type={type}
          className={[styles.input, !value && styles.lightGrey].join(' ')}
          onBlur={handleValueBlur}
        >
          <p className={[textStyle].join(' ')} style={color ? { color } : undefined}>
            {finalValue ?? placeHolder}
          </p>
        </button>
        {hasBorder && <RiArrowDropDownLine className={defaultStyles.dropDown} />}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      {renderDropdown()}
    </div>
  );
}
export default DropdownV3;
