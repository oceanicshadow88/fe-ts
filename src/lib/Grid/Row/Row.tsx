import React from 'react';
import styles from './Row.module.scss';

interface IPropsRow {
  children?: React.ReactNode;
  classesName?: string;
  defaultMargin?: boolean;
  defaultGap?: boolean;
}

export default function Row(props: IPropsRow) {
  const { children, classesName, defaultMargin = false, defaultGap } = props;
  return (
    <div
      className={[
        'flex alignCenter',
        classesName,
        defaultMargin ? styles.defaultMargin : '',
        defaultGap ? styles.defaultGap : ''
      ].join(' ')}
    >
      {children}
    </div>
  );
}

Row.defaultProps = {
  children: null,
  classesName: '',
  defaultMargin: false,
  defaultGap: false
};
