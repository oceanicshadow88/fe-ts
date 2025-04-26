import React, { useState } from 'react';
import { IPermissions } from '../../../types';
import styles from './SelectorIndicator.module.scss';

interface IProps {
  isChecked: boolean;
  permission: IPermissions;
  disabled?: boolean;
}

function SelectorIndicator({ isChecked, permission, disabled = false }: IProps) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <label
      data-testid="permission-option"
      key={permission.id}
      htmlFor={permission.id}
      className={styles.permission}
    >
      <input
        type="checkbox"
        id={permission.id}
        onChange={(e) => setChecked(e.target.checked)}
        checked={checked}
        disabled={disabled}
      />
      {permission.description}
    </label>
  );
}

export default SelectorIndicator;
