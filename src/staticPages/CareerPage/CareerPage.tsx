import React from 'react';
import { BsCodeSlash, BsDoorOpen } from 'react-icons/bs';
import { FcSupport } from 'react-icons/fc';
import { GiGrowth } from 'react-icons/gi';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import styles from './CareerPage.module.scss';
import careerPageHero from '../../assets/undraw_teamwork_hpdk.svg';
import teamenginerring from '../../assets/undraw_engineering_team_a7n2.svg';
import certification from '../../assets/undraw_certification_re_ifll.svg';
import Header from '../../components/Header/Header';
import JobList from './components/JobList/JobList';
import JobListFooter from './components/JobListFooter/JobListFooter';

export default function CareerPage() {
  return (
    <div className={styles.careerPage}>
      <Header />
      <Fade>
        <section>
          <div className={[styles.heroContainer, styles.container].join(' ')}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                A team that provide
                <span className="primaryColor"> Growth </span> and{' '}
                <span className="primaryColor">Support</span>
              </h1>
              <div className={styles.heroText}>
                A team that will provide appreciation, communication, and collaboration—when it
                comes to working together.
              </div>
              <div className={styles.heroCta}>
                <button className={styles.heroCtaBtn}>
                  <a href="#jobList">See our open positions</a>
                </button>
              </div>
            </div>
            <div className={styles.heroImage}>
              <img src={careerPageHero} alt="hero_image" />
            </div>
          </div>
        </section>
      </Fade>
      <section className={styles.cultureSection}>
        <div className={styles.container}>
          <h2>Our culture</h2>
          <div className={[styles.contentContainer, 'flex'].join(' ')}>
            <Bounce left cascade>
              <ul>
                <li>
                  <div className={styles.icon}>
                    <FcSupport />
                  </div>
                  <h3>Support</h3>
                  <p>
                    In a team you’ll never have to go it alone. It is important to know that the
                    more support you provided to the team the more support you will be given back.
                  </p>
                </li>
                <li>
                  <div className={styles.icon}>
                    <GiGrowth />
                  </div>
                  <h3>Growth</h3>
                  <p>
                    Our coach/tutor not only provide pair-programming to the you and also we have an
                    1 on 1 section for us to listen to you and how we can help.
                  </p>
                </li>
                <li>
                  <div className={styles.icon}>
                    <BsDoorOpen />
                  </div>
                  <h3>Open & Transparent</h3>
                  <p>
                    Everyone stays informed on all the latest projects, and everyone’s input is
                    welcome.
                  </p>
                </li>
                <li>
                  <div className={styles.icon}>
                    <BsCodeSlash />
                  </div>
                  <h3>Development</h3>
                  <p>
                    To able to learn the best practices. we always keep up to date to the code
                    quality and tools we used.
                  </p>
                </li>
              </ul>
            </Bounce>
            <Zoom>
              <div className={styles.imgContainer}>
                <img src={teamenginerring} alt="culture" />
              </div>
            </Zoom>
          </div>
        </div>
      </section>
      <section id="jobList" className={styles.container}>
        <Fade>
          <JobList />
        </Fade>
      </section>
      <section className={[styles.cultureSection, styles.benefitsSection].join(' ')}>
        <div className={styles.container}>
          <h2>Our benefits</h2>
          <div className={[styles.contentContainer, 'flex'].join(' ')}>
            <Fade cascade>
              <ul>
                <li>
                  <div className={styles.icon}>
                    <FcSupport />
                  </div>
                  <h3>Latest Tech Stack</h3>
                  <p>
                    In the team we train you on the latest tech stack, which includes an outstanding
                    CI/CD pipeline to ensure that you create high-quality code, seniors will also do
                    PR reviews to ensure that you are writing clean and scaled code.
                  </p>
                </li>
                <li>
                  <div className={styles.icon}>
                    <GiGrowth />
                  </div>
                  <h3>Growth</h3>
                  <p>
                    Our coach/tutor not only provides pair-programming to the team and also we have
                    a 1 on 1 section for us to listen to you and how we can help.
                  </p>
                </li>
                <li>
                  <div className={styles.icon}>
                    <BsDoorOpen />
                  </div>
                  <h3>Weekend off</h3>
                  <p>
                    If the team can finish tickets on time. There will be free weekends. However, if
                    you wanted to learn more we are also welcome.
                  </p>
                </li>
                <li>
                  <div className={styles.icon}>
                    <BsCodeSlash />
                  </div>
                  <h3>Development</h3>
                  <p>
                    To be able to learn the best practices. we always keep up to date with the code
                    quality and tools we used.
                  </p>
                </li>
              </ul>
            </Fade>
            <Zoom>
              <div className={styles.certificationImgContainer}>
                <img src={certification} alt="benefits" />
              </div>
            </Zoom>
          </div>
        </div>
      </section>
      <section className={styles.footerSection}>
        <Fade>
          <JobListFooter />
        </Fade>
      </section>
    </div>
  );
}
