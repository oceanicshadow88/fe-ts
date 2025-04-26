import React from 'react';
import Fade from 'react-reveal/Fade';
import { HiOutlineMailOpen, HiCheck } from 'react-icons/hi';
import Header from '../../components/Header/Header';
import shapeLight from '../../assets/shapeLight.png';
import darkCircle from '../../assets/shapeDark.png';
import styles from './KanbanBoardPage.module.scss';
import DemoVideo from '../../components/DemoVideo/DemoVideo';
import FeatureSection from './components/FeatureSection/FeatureSection';
import Footer from '../../components/Footer/Footer';

const featureSectionPropsObjs = [
  {
    subTitle: 'Visualizing Information',
    title: 'Visual representation',
    desc: "You will be provided with a clear visual representation of the work that needs to be done, the work that is in progress, and the work that has been completed. Your team members will quickly understand the project's current status and what needs to be done next."
  },
  {
    subTitle: 'Adapting to Change with Ease',
    title: 'Agility through Flexibility',
    desc: "Your board will be flexible enough to adapt to your team's needs. Adding, removing, or rearranging tickets should be easy as priorities change. Your board should also allow updating tickets' detailed information to match your team's specific needs."
  },
  {
    subTitle: 'Flexible arrangement',
    title: 'Arrange your Board your way',
    desc: 'Arrange your Board to analyse tickets from different perspectives - status, assignee and more.'
  },
  {
    subTitle: 'Custom status',
    title: 'Visualize any process with Custom Statuses',
    desc: 'Define and create your unique statuses for any workflow, from sprints to multi-stage processes. Add new statuses or edit existing ones directly in Board view.'
  },
  {
    subTitle: 'Drag & Drop',
    title: 'Drag-and-drop your updates',
    desc: 'Quickly prioritize tickets, adjust the progress of your project, and move tickets between different columns in your Board. It helps you save time and reduce the need for manual data entry, and ultimately streamline your workflow and optimize your productivity.'
  }
];

export default function KanbanBoardPage() {
  return (
    <>
      <div className={styles.page}>
        <Header />
        <Fade>
          <div className={styles.unauthorizePageContainer}>
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
            <section className={styles.hero}>
              <div className={styles.content}>
                <h1 data-testid="header-text">
                  Create the perfect Agile workflow with Board view.
                </h1>
                <p className={styles.text}>
                  Build a flexible Kanban system to visualize your work and improve project
                  management.
                </p>
                <form className={`${styles.form} ${styles.flex_col}`}>
                  <div className={styles.email__wrapper}>
                    <input
                      type="email"
                      className={styles.email__input}
                      placeholder="Enter your work email"
                      required
                    />
                    <HiOutlineMailOpen className={styles.email__icon} />
                  </div>
                  <button type="submit" className={styles.start__btn}>
                    Get Started
                  </button>
                </form>
              </div>
              <div className={styles.demo}>
                <DemoVideo src="https://clickup.com/videos/features/kanban-board/board-view-agile-inventory.mp4" />
              </div>
            </section>
          </div>
        </Fade>
        {featureSectionPropsObjs.map((e, i) => (
          <FeatureSection
            key={e.desc}
            subTitle={e.subTitle}
            title={e.title}
            desc={e.desc}
            layout={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
        <section className={styles.section_two}>
          <p className={styles.header__before}>visualize</p>
          <h2 className={styles.header}>Organize work and assess bandwidth.</h2>
          <div className={styles.container}>
            <div className={styles.card}>
              <img
                src="https://clickup.com/images/features/kanban-board/board-view-fiter.png"
                alt="demo"
                className={styles.image}
              />
              <h3>Stay on track with sorting and filtering.</h3>
              <ul>
                <li>
                  <span className={styles.listIcon}>
                    <HiCheck color="white" fontSize="16px" />
                  </span>
                  <span>Sort tickets in a column by due date, priority, and more</span>
                </li>
                <li>
                  <span className={styles.listIcon}>
                    <HiCheck color="white" fontSize="16px" />
                  </span>
                  <span>Filter tickets by assignee to only see your work</span>
                </li>
                <li>
                  <span className={styles.listIcon}>
                    <HiCheck color="white" fontSize="16px" />
                  </span>
                  <span>Add filtered views to your Favorites for future reference</span>
                </li>
              </ul>
            </div>
            <div className={`${styles.card} ${styles.pink}`}>
              <img
                src="https://clickup.com/images/features/kanban-board/board-view-fiter.png"
                alt="demo"
                className={styles.image}
              />
              <h3>Monitor capacity with Work in Progress Limits.</h3>
              <ul>
                <li>
                  <span className={styles.listIcon}>
                    <HiCheck color="white" fontSize="16px" />
                  </span>

                  <span>Easily see when there&#39;s too much work in a status</span>
                </li>
                <li>
                  <span className={styles.listIcon}>
                    <HiCheck color="white" fontSize="16px" />
                  </span>
                  <span>Measure workload by sprint points, time estimates, and more</span>
                </li>
                <li>
                  <span className={styles.listIcon}>
                    <HiCheck color="white" fontSize="16px" />
                  </span>
                  <span>Spot bottlenecks at a glance to ship projects faster</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className={styles.supportSection}>
          <div className={styles.card}>
            <div className={styles.bg__dots} />
            <h2>Save one day every week with TechScrum&#39;s Board view.</h2>
            <form className={`${styles.form} ${styles.form__row}`}>
              <div className={styles.email__wrapper}>
                <input
                  type="email"
                  className={styles.email__input}
                  placeholder="Enter your work email"
                  required
                />
                <HiOutlineMailOpen className={styles.email__icon} />
              </div>
              <button type="submit" className={styles.start__btn}>
                Get Started
              </button>
            </form>
          </div>
          <div className={styles.flexContainer}>
            <div className={styles.flex__row}>
              <img
                className={styles.imgIcons}
                src="https://clickup.com/images/kindness/free-training.svg"
                alt="icons"
              />
              <p>
                <a href="/">Free training</a> & 24-hour support
              </p>
            </div>
            <div className={styles.flex__row}>
              <img
                className={styles.imgIcons}
                src="https://clickup.com/images/kindness/security.svg"
                alt="icons"
              />
              <p>
                Serious about <a href="/">security & privacy</a>
              </p>
            </div>
            <div className={styles.flex__row}>
              <img
                className={styles.imgIcons}
                src="https://clickup.com/images/kindness/uptime.svg"
                alt="icons"
              />
              <p>
                <a href="/">Highest levels of uptime</a> the last 12 months
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
