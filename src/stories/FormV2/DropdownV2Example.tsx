import React from 'react';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';
import { IMinEvent, IOptions } from '../../types';

interface ButtonProps {
  label: string;

  onClick: (e: IMinEvent) => void;

  dataTestId?: string;

  loading?: boolean;

  name?: string;

  options?: IOptions[];
}

/**
 * Primary UI component for user interaction
 */
export function DropdownV2Example({
  dataTestId = '',
  label,
  loading = false,
  name = 'dropdownV2',
  onClick,
  options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' }
  ]
}: ButtonProps) {
  return (
    <DropdownV2
      dataTestId={dataTestId}
      label={label}
      loading={loading}
      onValueChanged={onClick}
      name={name}
      value="1"
      options={options}
    />
  );
}
