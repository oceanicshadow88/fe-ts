/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './CheckBox.module.scss';

interface CustomCheckboxGroupProps {
  label: string;
  checked: boolean;
  onChange: (value: any) => void; // Callback to notify parent
  name: string;
}

function CheckBox({ label, checked, onChange, name }: CustomCheckboxGroupProps) {
  return (
    <label
      className={styles.customCheckbox}
      onClick={() => onChange({ target: { value: !checked, name } })}
      htmlFor={name}
    >
      <input name={name} type="checkbox" checked={checked} />
      <span />
      {label}
    </label>
  );
}

export default CheckBox;
