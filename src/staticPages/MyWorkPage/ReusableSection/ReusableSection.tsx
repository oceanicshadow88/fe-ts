import React from 'react';
import styles from './ReusableSection.module.scss';
import TextPart, { ITextPart } from './TextPart/TextPart';
import ImagePart from './ImagePart/ImagePart';

interface IReusableSection extends ITextPart {
  isImageRight: boolean;
}

export default function ReusableSection(props: IReusableSection) {
  const { isImageRight, subtitle, heading, text } = props;
  const reusableSectionClass = isImageRight
    ? styles.reusableSection
    : [styles.reusableSection, styles.squareToLeft, styles.columnReverse].join(' ');
  return (
    <div className={styles.wrapper}>
      <div className={reusableSectionClass}>
        {isImageRight ? (
          <>
            <TextPart subtitle={subtitle} heading={heading} text={text} />
            <ImagePart />
          </>
        ) : (
          <>
            <ImagePart />
            <TextPart subtitle={subtitle} heading={heading} text={text} />
          </>
        )}
      </div>
    </div>
  );
}
