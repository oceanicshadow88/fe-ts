/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import InputV2 from '../../lib/FormV2/InputV2/InputV2';

interface ButtonProps {
  label: string;

  onClick?: () => void;

  dataTestId?: string;

  loading?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export function InputV2Example({ dataTestId = '', label, loading = false, ...props }: ButtonProps) {
  return (
    <InputV2
      dataTestId={dataTestId}
      label={label}
      loading={loading}
      onValueChanged={() => {}}
      name=""
    />
  );
}
