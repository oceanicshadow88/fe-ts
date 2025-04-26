import React from 'react';
import { TiTick } from 'react-icons/ti';
import { capitalise } from '../../../utils';
import CheckList from '../../List/CheckList/CheckList';
import HeroTitle from '../../Text/HeroTitle/HeroTitle';
import styles from './FeatureImgCard.module.scss';

interface Props {
  cardTitle: string;
  imgSrc: string;
  list: string[];
  cardThemeColor?: 'pink' | 'blue' | 'brand' | 'green' | 'default' | '';
}

function FeatureImgCard({ cardTitle, imgSrc, list, cardThemeColor }: Props) {
  return (
    <div
      className={[
        styles.mainWrapper,
        styles[`mainWrapper${capitalise(cardThemeColor as string)}`]
      ].join(' ')}
    >
      <div className={styles.cardImgWrapper}>
        <img src={imgSrc} alt="feature1" loading="lazy" />
      </div>
      <HeroTitle mainTitleText={cardTitle} isMainTextShrink />
      <CheckList
        list={list}
        prefixIcon={<TiTick color={cardThemeColor === 'default' ? 'black' : 'white'} size={18} />}
        isShowIconContainer
        containerBgColor={cardThemeColor}
        isHaveLeadingPadding={false}
      />
    </div>
  );
}

FeatureImgCard.defaultProps = {
  cardThemeColor: 'default'
};

export default FeatureImgCard;
