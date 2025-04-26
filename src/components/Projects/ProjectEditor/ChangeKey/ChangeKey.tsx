import React from 'react';
import styles from './ChangeKey.module.scss';

interface ChangeKeyProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChangeKey(props: ChangeKeyProps) {
  const { value, onChange } = props;
  return (
    <div className={styles.keyInputSection}>
      <label htmlFor="key">
        <span>Key</span>
        <input
          type="text"
          id="key"
          name="key"
          data-testid="key"
          onChange={onChange}
          value={value}
        />
      </label>
    </div>
  );
}
