import React from 'react';
import { capitalise } from '../../../utils';
import styles from './SectionWrapper.module.scss';

interface Props {
  children: React.ReactNode;
  backgroundColor?: 'blue' | 'pink' | 'purple' | 'green' | 'default' | '';
  extended?: boolean;
  style?: React.CSSProperties;
}

function SectionWrapper({ children, backgroundColor, extended, style }: Props) {
  return (
    <div
      className={[
        styles.sectionWrapper,
        styles[`bg${capitalise(backgroundColor as string)}`],
        styles[extended ? 'extended' : '']
      ].join(' ')}
      style={{ ...style }}
    >
      {children}
    </div>
  );
}

SectionWrapper.defaultProps = {
  backgroundColor: '',
  extended: false,
  style: {}
};

export default SectionWrapper;
