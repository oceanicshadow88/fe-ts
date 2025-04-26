/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';

interface ButtonProps {
  /**
   * Fill Button
   */
  fill?: boolean;

  /**
   * How large should the button be?
   */
  size?: 'xs' | 'md' | 'lg';

  /**
   * Button contents
   */
  text: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Should disabled
   */
  disabled?: boolean;

  /**
   * For Testing
   */
  dataTestId?: string;

  /**
   * This will show a red button
   */
  danger?: boolean;

  /**
   * Any icons
   */
  icon?: any;

  /**
   * Is Loading
   */
  loading?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export function ButtonV2Example({
  fill = false,
  size = 'md',
  dataTestId = '',
  text,
  disabled,
  loading = false,
  icon = null,
  danger = false,
  ...props
}: ButtonProps) {
  return (
    <ButtonV2
      onClick={() => {}}
      dataTestId={dataTestId}
      text={text}
      size={size}
      fill={fill}
      disabled={disabled}
      danger={danger}
      icon={icon}
      loading={loading}
    />
  );
}
