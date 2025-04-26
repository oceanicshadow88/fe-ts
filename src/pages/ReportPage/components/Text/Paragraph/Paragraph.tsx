import React from 'react';
import styles from './Paragraph.module.scss';

function Paragraph({ children, centerText }: { children: React.ReactNode; centerText?: boolean }) {
  return (
    <p className={[styles.paragraph, styles[centerText ? 'centerText' : '']].join(' ')}>
      {children}
    </p>
  );
}

Paragraph.defaultProps = {
  centerText: false
};

export default Paragraph;
