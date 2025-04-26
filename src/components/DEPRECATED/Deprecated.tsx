/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
import React from 'react';

interface IDeprecated {
  children?: React.ReactNode | string;
}

export default function Deprecated(props: IDeprecated) {
  const { children } = props;
  console.error('THERE IS DEPRECATED COMPONENT');
  if (children) {
    return (
      <h1 style={{ color: 'red', textAlign: 'center', margin: '100px 0' }}>DEPRECATED COMPONENT</h1>
    );
  }
  return (
    <h1 style={{ color: 'red', textAlign: 'center', margin: '100px 0' }}>DEPRECATED COMPONENT</h1>
  );
}
