import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Space from './components/DecorationWidget/Space/Space';
import EmailInput from './components/Form/Input/EmailInput';
import VideoPlayer from './components/Media/VideoPlayer/VideoPlayer';
import HeroTitle from './components/Text/HeroTitle/HeroTitle';
import Paragraph from './components/Text/Paragraph/Paragraph';
import useWindowSize from './hooks/useWindowSize';
import BasicFlex from './layout/BasicFlex/BasicFlex';
import styles from './ReportPage.module.scss';
import { BREAKPOINTS } from './utils';
import {
  GET_START_SECTION_DATA,
  BOARD_SECTION_DATA_LIST,
  FEATURE_SECTION_DATA,
  CUMSTOMER_SECTION_DATA,
  SUMMARY_LINKS_DATA
} from './pageTextContent';
import FeatureImgCard from './components/Card/FeatureImgCard/FeatureImgCard';
import SectionWrapper from './components/Card/SectionWrapper/SectionWrapper';
import SummaryLinksCard from './components/Card/SummaryLinksCard/SummaryLinksCard';

type ReportPageColors = '' | 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | undefined;

function ReportPage() {
  const { width } = useWindowSize(); // this hooks will only be accepted in layout level component

  const isDeskTop = width > BREAKPOINTS[768];
  const isMobile = width < BREAKPOINTS[600];
  const isDeskTopPlus = width > BREAKPOINTS[1000];

  return (
    <>
      <Header />
      <div className={styles.mainWrapper}>
        <span className={styles.shape3Container}>
          <img
            src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
            alt=""
          />
        </span>
        {/* hero-section */}
        <BasicFlex gap="large">
          <div>
            <HeroTitle mainTitleText="create the perfect Agile workflow with Board view" />
            <Paragraph>{GET_START_SECTION_DATA.GET_START_SECTION_DESCRIPTION_TEXT}</Paragraph>
            <Space />
            <EmailInput isShowInputIcon isFullWidth isButtonShrink />
            <Space power={2} />
          </div>
          <div>
            <Space power={2} />
            {!isDeskTop && <Space power={isMobile ? 1 : 2} />}
            <VideoPlayer videoSrc="https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4" />
          </div>
        </BasicFlex>
        {isDeskTopPlus && <Space power={1} />}
        {isDeskTopPlus && <Space power={1} />}
        {/* board-section */}
        {BOARD_SECTION_DATA_LIST.map(
          ({ MAIN_TITLE_TEXT, SUB_TITLE_TEXT, THEME_COLOR, VIDEO_URL, DESCRIPTION }, index) => (
            <BasicFlex
              flexGrowRatio="moreOnLeft"
              gap={isDeskTopPlus ? 'extraLarge' : 'large'}
              key={MAIN_TITLE_TEXT + SUB_TITLE_TEXT}
              isFlexReverse={!!(index % 2)}
            >
              <div>
                <HeroTitle
                  mainTitleText={MAIN_TITLE_TEXT}
                  isShowSubTitle
                  subTitleText={SUB_TITLE_TEXT}
                  isShowUnderline
                  subTitleColor={THEME_COLOR as ReportPageColors}
                  underlineColor={THEME_COLOR as ReportPageColors}
                  isMainTextShrink
                  centerText={!isDeskTop}
                />

                <Space power={3} />
                <Paragraph centerText={!isDeskTop}>{DESCRIPTION}</Paragraph>
              </div>
              {!isDeskTop && <Space power={2} />}
              <VideoPlayer
                videoSrc={VIDEO_URL}
                isHaveBackground
                isShowDiamond={isDeskTop}
                diamondColor={
                  THEME_COLOR as
                    | 'default'
                    | 'purple'
                    | 'pink'
                    | 'blue'
                    | 'green'
                    | 'yellow'
                    | undefined
                }
                diamondPosition={index % 2 ? 'right' : 'left'}
              />
            </BasicFlex>
          )
        )}
        {/* feature-section */}
        <div>
          <HeroTitle
            mainTitleText={FEATURE_SECTION_DATA.SECTION_TITLE_MAIN_TEXT}
            isShowSubTitle
            subTitleText={FEATURE_SECTION_DATA.SECTION_TITLE_SUB_TEXT}
            centerText
            subTitleColor={FEATURE_SECTION_DATA.SECTION_TITLE_SUB_COLOR as ReportPageColors}
            isMainTextShrink
          />
          <Space power={3} />

          <BasicFlex gap="large" style={isDeskTopPlus ? { paddingInline: 'unset' } : undefined}>
            {FEATURE_SECTION_DATA.SECTION_CARDS.map(
              ({ CARD_CONTENT_LIST, CARD_TITLE_TEXT, CARD_IMG_SRC, CARD_THEME_COLOR }) => (
                <FeatureImgCard
                  key={CARD_TITLE_TEXT + CARD_IMG_SRC}
                  list={CARD_CONTENT_LIST}
                  cardTitle={CARD_TITLE_TEXT}
                  imgSrc={CARD_IMG_SRC}
                  cardThemeColor={
                    CARD_THEME_COLOR as
                      | ''
                      | 'pink'
                      | 'blue'
                      | 'green'
                      | 'brand'
                      | 'default'
                      | undefined
                  }
                />
              )
            )}
          </BasicFlex>
        </div>
        {/* customer-section */}
        <SectionWrapper backgroundColor="default">
          <BasicFlex gap={isDeskTopPlus ? 'large' : 'small'}>
            <HeroTitle
              mainTitleText={CUMSTOMER_SECTION_DATA.SECTION_TITLE}
              centerText={!isDeskTop}
              isMainTextShrink
            />
            <div
              style={{
                position: 'absolute',
                insetBlock: '-20px',
                right: '-20px',
                background: `url(
                  ${CUMSTOMER_SECTION_DATA.SECTION_BACKGROUND_IMG}
                ) repeat top right/cover`,
                width: isDeskTop ? '50%' : '100%'
              }}
            />
            <EmailInput
              isShowInputIcon
              isFullWidth
              isInputAndBtnOnSameRow={!isMobile}
              isButtonShrink={!isMobile}
            />
          </BasicFlex>
        </SectionWrapper>
      </div>
      {/* summary-link-sction */}
      <SummaryLinksCard summaryLinksData={SUMMARY_LINKS_DATA} />
      <Footer />
    </>
  );
}

export default ReportPage;
