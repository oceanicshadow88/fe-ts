/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextAreaV2 from '../../lib/FormV2/TextAreaV2/TextAreaV2';

interface ButtonProps {
  label: string;

  onClick?: () => void;

  dataTestId?: string;

  loading?: boolean;

  defaultValue?: string;

  name?: string;
}

/**
 * Primary UI component for user interaction
 */
export function TextAreaV2Example({
  dataTestId = '',
  label,
  loading = false,
  name = '',
  defaultValue = '',
  ...props
}: ButtonProps) {
  return (
    <TextAreaV2
      dataTestId={dataTestId}
      label={label}
      loading={loading}
      onValueChanged={() => {}}
      name={name}
      defaultValue={defaultValue}
    />
  );
}
