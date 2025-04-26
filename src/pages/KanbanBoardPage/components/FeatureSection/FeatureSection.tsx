import React from 'react';
import DemoVideo from '../../../../components/DemoVideo/DemoVideo';
import diamondShape from '../../../../assets/purple-diamond.svg';
import styles from './FeatureSection.module.scss';

interface IFeatureSectionRequiredProps {
  subTitle: string;
  title: string;
  desc: string;
}

interface IFeatureSectionOptionalProps {
  layout?: 'left' | 'right';
}

interface IFeatureSectionProps extends IFeatureSectionRequiredProps, IFeatureSectionOptionalProps {}

const defaultProps: IFeatureSectionOptionalProps = {
  layout: 'left'
};

function FeatureSection(props: IFeatureSectionProps) {
  const { subTitle, title, desc, layout } = props;
  let layoutClass: string;
  if (layout === 'right') {
    layoutClass = `${styles.section} ${styles.section__right}`;
  } else {
    layoutClass = `${styles.section}`;
  }
  return (
    <section className={layoutClass}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.header__before}>{subTitle}</p>
          <h2 className={styles.header}>{title}</h2>
          <p className={styles.text}>{desc}</p>
        </div>
        <div className={styles.demo}>
          <DemoVideo src="https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4" />
          <img src={diamondShape} alt="diamondShape" className={styles.diamondShape} />
        </div>
      </div>
    </section>
  );
}

FeatureSection.defaultProps = defaultProps;

export default FeatureSection;
