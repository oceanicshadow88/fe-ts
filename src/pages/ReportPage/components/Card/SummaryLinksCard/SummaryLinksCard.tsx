import React from 'react';
import { breakText } from '../../../utils';
import styles from './SummaryLinksCard.module.scss';

export interface ISummaryLink {
  iconImgSrc?: string;
  summaryText?: string;
  linkText?: string;
}

interface Props {
  summaryLinksData?: ISummaryLink[];
}

function SummaryLinksCard({ summaryLinksData }: Props) {
  return (
    <div className={styles.flexContainer}>
      {summaryLinksData?.map(({ iconImgSrc, summaryText, linkText }) => {
        return (
          <div className={styles.flex__row} key={crypto.randomUUID().toString() + summaryText}>
            <img className={styles.imgIcons} src={iconImgSrc} alt="icons" />
            {breakText(summaryText as string, linkText as string).map((item) => {
              if (item === linkText) {
                return (
                  <a href="/" key={crypto.randomUUID()}>
                    {item}
                  </a>
                );
              }

              return <p key={crypto.randomUUID()}>{item}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

SummaryLinksCard.defaultProps = {
  summaryLinksData: [
    {
      iconImgSrc: 'https://clickup.com/images/kindness/security.svg',
      summaryText: 'This is a placeholder',
      linkText: 'is'
    }
  ]
};

export default SummaryLinksCard;
