import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import styles from './HomePage.module.scss';
import rochelle from '../../assets/rochelle.png';
import envelope from '../../assets/envelope.svg';
import boardView from '../../assets/boardView.png';
import rochelleAvatar from '../../assets/rochelleAvatar.png';
import shapeLight from '../../assets/shapeLight.png';
import chat from '../../assets/undraw_quick_chat_re_bit5.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import WhyUs from './WhyUs/WhyUs';
import Organizing from './Organizing/Organizing';
import AnyWhereSection from './AnyWhereSection/AnyWhereSection';
import Prevent from './Prevent/Prevent';
import darkCircle from '../../assets/shapeDark.png';
import Scroll from '../../components/Scroll/Scroll';
import Tracking from './Tracking/Tracking';

export default function HomePage() {
  return (
    <div>
      <Header />
      <Fade>
        <div className={styles.unauthorizePageContainer}>
          <Scroll />
          <span className={styles.shape2Container}>
            <img src={shapeLight} alt="" />
          </span>
          <div className={styles.circleContainer}>
            <img
              src="https://themexriver.com/appilo-theme/saas-classic-dark/wp-content/uploads/sites/19/2021/07/b-shape2.png"
              alt=""
            />
          </div>
          <span className={styles.shape3Container}>
            <img
              src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/slider-shape-3.png"
              alt=""
            />
          </span>
          <span className={styles.shape4Container}>
            <img src={darkCircle} alt="" />
          </span>
          <div className={styles.textContainer}>
            <h1 className={styles.header} data-testid="header-text">
              An agile software that prevents <span className="primaryColor">delays.</span>
            </h1>
            <p className={styles.text}>Manage your project from start to finish with TechScrum.</p>
            <p className={styles.text}>No credit required.</p>
          </div>
        </div>
      </Fade>
      <div className={styles.homePage}>
        <section className={styles.jobDoneSection}>
          <div className={styles.jobDoneContainer}>
            <WhyUs />
            <Organizing />
            <div className={styles.projectManagementRow}>
              <Fade>
                <div className={[styles.container, styles.row, styles.projectManagement].join(' ')}>
                  <div className={styles.projectManagementContent}>
                    <h3 className={styles.colorWhite}>
                      Experience the simplest project management software.{' '}
                    </h3>
                    <div className={styles.jobDoneParagraph}>
                      <p className={styles.colorWhite}>
                        Using TechScrum on mobile, desktop, or tablet, thanks to automatic,
                        cloud-based syncing. You and your team can update inventory in real time
                        from any location. Are you ready to experience to boost up the company
                        productivity?
                      </p>
                    </div>
                  </div>
                  <picture>
                    <img src={boardView} alt="board view" />
                  </picture>
                </div>
              </Fade>
              <img
                src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
                alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
                className={styles.projectManagementbgImg2}
              />
              <img
                src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
                alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
                className={styles.projectManagementbgImg1}
              />
            </div>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <Tracking />
          <div className="background--grey">
            <Prevent />
          </div>
        </section>
        <section className={styles.cardsSection}>
          <AnyWhereSection />
        </section>
        <section className={styles.clientsSection} style={{ display: 'none' }}>
          <div className={styles.clientsContainer}>
            <picture>
              <img src={rochelle} alt="Profile" />
            </picture>
            <div className={styles.clientsContent}>
              <h3>Clients actually use it with me!</h3>
              <p>
                TechScrum was built so you can manage ALL your client work in one platform. From
                invoicing, to time tracking, to unlimited client access, everything you need to run
                your client services is in TechScrum.
              </p>
              <div className={styles.clientsQuote}>
                <div className={styles.quoteAvatar}>
                  <picture>
                    <img src={rochelleAvatar} alt="avatar" />
                  </picture>
                </div>
                <div className={styles.quoteWrap}>
                  <p className={styles.quoteText}>
                    “TechScrum is the first project management tool that I&apos;ve been able to get
                    clients to actually use with me. I&apos;ve tried Asana and Trello, and clients
                    just ignored them.”
                  </p>
                  <div className={styles.quoteAuthor}>
                    <span className={styles.authorName}>Rochelle Broder-Singer</span>
                    <span className={styles.authorRole}>President/Chief Word Wrangler</span>
                  </div>
                </div>
              </div>
              <div className={styles.clientsCta}>
                <a
                  className={styles.ctaButton}
                  href="https://www.TechScrum.com/signup/"
                  target="_self"
                >
                  Start Your Free Trial
                </a>
                <p className={styles.ctaText}>No credit card required</p>
              </div>
            </div>
          </div>
          <img
            src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
            alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
            className={styles.bgImg2}
          />
          <img
            src="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
            alt="https://themexriver.com/appilo-theme/seo-agency/wp-content/uploads/sites/56/2021/11/ab-shape.png"
            className={styles.bgImg3}
          />
        </section>
        <section className={styles.supportSection}>
          <div className={[styles.container, styles.row, styles.projectManagement].join(' ')}>
            <div className={styles.supportContainer}>
              <div className={styles.supportContent}>
                <h3>
                  <span className="primaryColor">Support</span> when needed
                </h3>
                <p>
                  Our support team delivers first-class customer support around the clock.
                  We&apos;re here to answer any question and help every step of the way.
                </p>
                <div className={styles.supportButtons}>
                  <Link to="/contact" className={styles.supportContact}>
                    <picture>
                      <img src={envelope} alt="envelope" />
                    </picture>
                    <span>Contact</span>
                  </Link>
                </div>
                <div className={styles.supportQuote} style={{ display: 'none' }}>
                  <div className={styles.quoteAvatar}>
                    <picture>
                      <img src={chat} alt="avatar" />
                    </picture>
                  </div>
                  <div className={styles.quoteWrap}>
                    <p className={styles.quoteText}>
                      “What reassured us was TechScrum&apos;s reliable and prompt customer service.
                      If ever an issue came up, TechScrum replied and resolved it promptly.”
                    </p>
                    <div className={styles.quoteAuthor}>
                      <span className={styles.authorName}>Shekhar Tamasker</span>
                      <span className={styles.authorRole}>
                        Section Head of Scheduling and Reporting
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Zoom>
                <picture className={styles.supportPicture}>
                  <img src={chat} alt="cover" />
                </picture>
              </Zoom>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
