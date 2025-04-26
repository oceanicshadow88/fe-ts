import React from 'react';
import styles from './RadioGroup.module.scss'; // Import SCSS module

interface Option {
  label: string;
  value: string;
}

interface CustomRadioGroupProps {
  options: Option[];
  name: string;
  selected: string; // Selected value passed from the parent
  onChange: (value: any) => void; // Callback to notify parent
}

function RadioGroup({ options, name, selected, onChange }: CustomRadioGroupProps) {
  return (
    <div className={styles.customRadioGroup}>
      {options.map((option) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <label
          className={styles.customRadio}
          key={option.value}
          htmlFor={name}
          onClick={() => onChange({ target: { name, value: option } })}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
          />
          <span />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
