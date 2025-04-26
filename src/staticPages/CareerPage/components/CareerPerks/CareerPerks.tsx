import React from 'react';
import styles from './CareerPerks.module.scss';
import perkVisual1 from '../../../../assets/careerPage/perk1.png';
import perkVisual2 from '../../../../assets/careerPage/perk2.png';
import perkVisual3 from '../../../../assets/careerPage/perk3.png';
import perkVisual4 from '../../../../assets/careerPage/perk4.png';
import perkVisual5 from '../../../../assets/careerPage/perk5.png';
import perkVisual6 from '../../../../assets/careerPage/perk6.png';
import perkVisual7 from '../../../../assets/careerPage/perk7.png';
import perkVisual8 from '../../../../assets/careerPage/perk8.png';
import logo from '../../../../assets/careerPage/logo.svg';

function CareerPerks() {
  return (
    <div className={styles.careerPerksContainer}>
      <h1 className={styles.careerPerksTitle}>A team with perks</h1>
      <p className={styles.careerPerksText}>
        From employee share options and flexible working hours to paid gym memberships and learning
        stipends, we&apos;ve got all the perks and benefits that matter most.
      </p>
      <div className={styles.careerPerksGrid}>
        <div className={styles.perk1}>
          <span className={styles.perkText}>When you start</span>
          <div className={styles.perkDetails}>
            <ul className={styles.perkDetailsList}>
              <li>Welcome package complete with Teamwork swag</li>
              <li>Employee share programme</li>
              <li>Health care (dental for U.S. employees)</li>
              <li>Teamwork buddy to show you the ropes on your first week</li>
              <li>Top class equipment and choice of hardware</li>
            </ul>
            <div className={styles.perkDetailsFooter}>
              <img src={logo} alt="logo" />
              <span>Careers at Teamwork</span>
            </div>
          </div>
        </div>
        <div className={styles.img1}>
          <img src={perkVisual1} alt="Perks visual 1" />
        </div>
        <div className={styles.img2}>
          <img src={perkVisual2} alt="Perks visual 2" />
        </div>
        <div className={styles.img3}>
          <img src={perkVisual3} alt="Perks visual 3" />
        </div>
        <div className={styles.perk2}>
          <span className={styles.perkText}>While you work</span>
          <div className={styles.perkDetails}>
            <ul className={styles.perkDetailsList}>
              <li>Flexible working hours</li>
              <li>Catered lunches</li>
              <li>Unlimited snacks and drinks</li>
              <li>Yearly grand council event in Ireland</li>
              <li>Teamwork legend awards</li>
              <li>Hackathon</li>
              <li>Weekly trivia</li>
            </ul>
            <div className={styles.perkDetailsFooter}>
              <img src={logo} alt="logo" />
              <span>Careers at Teamwork</span>
            </div>
          </div>
        </div>
        <div className={styles.perk3}>
          <span className={styles.perkText}>Your health and wellness</span>
          <div className={styles.perkDetails}>
            <ul className={styles.perkDetailsList}>
              <li>Up to 30 days annual leave</li>
              <li>Paid gym membership</li>
              <li>Health care</li>
              <li>Pension</li>
              <li>Life assurance and income continuance protection</li>
              <li>Employee assistance programme</li>
              <li>Bike to work scheme</li>
            </ul>
            <div className={styles.perkDetailsFooter}>
              <img src={logo} alt="logo" />
              <span>Careers at Teamwork</span>
            </div>
          </div>
        </div>
        <div className={styles.img4}>
          <img src={perkVisual4} alt="Perks visual 4" />
        </div>
        <div className={styles.perk4}>
          <span className={styles.perkText}>Continuous learning</span>
          <div className={styles.perkDetails}>
            <ul className={styles.perkDetailsList}>
              <li>€1400 annual conference budget</li>
              <li>Any books you need</li>
              <li>Unlimited LinkedIn Learning courses</li>
              <li>Career development programme</li>
            </ul>
            <div className={styles.perkDetailsFooter}>
              <img src={logo} alt="logo" />
              <span>Careers at Teamwork</span>
            </div>
          </div>
        </div>
        <div className={styles.img5}>
          <img src={perkVisual5} alt="Perks visual 5" />
        </div>
        <div className={styles.img6}>
          <img src={perkVisual6} alt="Perks visual 6" />
        </div>
        <div className={styles.img7}>
          <img src={perkVisual7} alt="Perks visual 7" />
        </div>
        <div className={styles.perk5}>
          <span className={styles.perkText}>Family</span>
          <div className={styles.perkDetails}>
            <ul className={styles.perkDetailsList}>
              <li>Up to 26 weeks paid maternity leave</li>
              <li>PTO for Antenatal classes</li>
              <li>2 weeks paid paternity leave</li>
              <li>24 weeks adoption leave</li>
              <li>Half day on your child&aposs first day of school</li>
            </ul>
            <div className={styles.perkDetailsFooter}>
              <img src={logo} alt="logo" />
              <span>Careers at Teamwork</span>
            </div>
          </div>
        </div>
        <div className={styles.img8}>
          <img src={perkVisual8} alt="Perks visual 8" />
        </div>
      </div>
    </div>
  );
}

export default CareerPerks;
