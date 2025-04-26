import React from 'react';
import { capitalise } from '../../../utils';
import Breakline from '../../DecorationWidget/Breakline/Breakline';
import styles from './HeroTitle.module.scss';

interface Props {
  mainTitleText: string;
  isMainTextShrink?: boolean;
  subTitleText?: string;
  isShowSubTitle?: boolean;
  subTitleColor?: 'green' | 'purple' | 'blue' | 'yellow' | 'pink' | '';
  centerText?: boolean;
  isShowUnderline?: boolean;
  underlineColor?: 'green' | 'purple' | 'blue' | 'yellow' | 'pink' | '';
}

function HeroTitle({
  isShowSubTitle,
  mainTitleText,
  isMainTextShrink,
  subTitleText,
  subTitleColor,
  centerText,
  isShowUnderline,
  underlineColor
}: Props) {
  return (
    <>
      <div className={styles.heroTitle}>
        {isShowSubTitle && (
          <div
            className={[
              styles.subText,
              styles[centerText ? 'textCenter' : ''],
              styles[`textColor${capitalise(subTitleColor as string)}`]
            ].join(' ')}
          >
            {subTitleText}
          </div>
        )}
        <h2
          className={[
            styles[centerText ? 'textCenter' : ''],
            styles[isMainTextShrink ? 'shrinkH2' : '']
          ].join(' ')}
        >
          {capitalise(mainTitleText)}.
        </h2>
      </div>
      {isShowUnderline && <Breakline color={underlineColor as string} isCenter={centerText} />}
    </>
  );
}

HeroTitle.defaultProps = {
  subTitleText: 'placeholder for subTitle',
  isShowSubTitle: false,
  isMainTextShrink: false,
  subTitleColor: '',
  centerText: false,
  isShowUnderline: false,
  underlineColor: ''
};

export default HeroTitle;
