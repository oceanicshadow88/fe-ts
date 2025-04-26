import React from 'react';
import styles from './ChangeName.module.scss';

interface ChangeNameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChangeName(props: ChangeNameProps) {
  const { value, onChange } = props;
  return (
    <div className={styles.nameInputSection}>
      <label htmlFor="name">
        <span>Name</span>
        <input
          type="text"
          id="name"
          name="name"
          value={value}
          data-testid="name"
          onChange={onChange}
        />
      </label>
    </div>
  );
}
