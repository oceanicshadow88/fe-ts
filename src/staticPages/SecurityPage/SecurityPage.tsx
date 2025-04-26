import React from 'react';
import Top from './components/Top/Top';
import Card from './components/Card/Card';
import Certifications from './components/Certifications/Certifications';
import Partners from './components/Partners/Partners';
import Footer from '../../components/Footer/Footer';
import Faqs from '../SupportCenterPage/components/MainContent/Faqs/Faqs';

export default function SecurityPage() {
  return (
    <>
      <Top />
      <Card />
      <Certifications />
      <Partners />
      <Faqs />
      <Footer />
    </>
  );
}
