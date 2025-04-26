import React from 'react';
import styles from './TextPart.module.scss';

export interface ITextPart {
  subtitle: string;
  heading: string;
  text: string;
}

function TextPart(props: ITextPart) {
  const { subtitle, heading, text } = props;
  return (
    <div className={styles.textPart}>
      <div className={styles.subtitle}>{subtitle}</div>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default TextPart;
