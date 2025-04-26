import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ReusableSection from './ReusableSection/ReusableSection';
import HomeSection from './HomeSection/HomeSection';
import REUSABLE_SECTION_TEXT from './constant';
import VisualizeSection from './VisualizeSection/VisualizeSection';
import EmailSection from './EmailSection/EmailSection';
import KindnessSection from './KindnessSection/KindnessSection';

export default function MyWorkPage() {
  return (
    <>
      <Header />
      <HomeSection />
      {}
      {REUSABLE_SECTION_TEXT.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <ReusableSection
            key={uuidv4()}
            isImageRight={isEven}
            subtitle={item.subtitle}
            heading={item.heading}
            text={item.text}
          />
        );
      })}
      <VisualizeSection />
      <EmailSection />
      <KindnessSection />
      <Footer />
    </>
  );
}
