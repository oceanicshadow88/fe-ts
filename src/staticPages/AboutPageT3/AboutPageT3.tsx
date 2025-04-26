import React, { useState } from 'react';
import styles from './AboutPageT3.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StaffInfo from './components/StaffInfo/StaffInfo';
import StaffDetail from './components/StaffDetail/StaffDetail';
// Images
import Kitman from '../../assets/kitman.jpg';
import David from '../../assets/team2/david_guo.webp';
import Hyna from '../../assets/team2/hyna_hua.webp';
import joe from '../../assets/team3/joe.jpg';
import angela from '../../assets/team3/angela.jpg';
import charles from '../../assets/team3/charles.jpg';
import wendy from '../../assets/team3/wendy.png';
import andy from '../../assets/team3/andy.jpg';
import jason from '../../assets/team3/jason.jpg';
import zijun from '../../assets/team3/zijun.png';

interface IStaff {
  name: string;
  description?: string;
  image?: string;
  linkedin?: string;
  gender: 'male' | 'female';
  position: 'ceo' | 'business analyst' | 'developer';
}

const staffs: IStaff[] = [
  {
    name: 'kitman yiu',
    image: Kitman,
    linkedin: 'https://www.linkedin.com/in/kitman-yiu/',
    gender: 'male',
    position: 'ceo',
    description:
      '• Managing Project deadline to ensure issues can be finish on time\n• Resolving commutation issue between dev, designer and product manager\n• Improving CI/CD pipeline for dev teams, introducing new tech stack to dev team'
  },
  {
    name: 'david guo',
    image: David,
    linkedin: 'https://www.linkedin.com/in/david-guo-au',
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'wendy xu',
    linkedin: 'https://www.linkedin.com/in/chicheng-xu/',
    image: wendy,
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'hyna hua',
    image: Hyna,
    description:
      'Hyna Hua is a highly motivated and detail-oriented Business Analyst with experience in gathering, analyzing and documenting business requirements, identifying gaps, and developing innovative solutions to improve business operations. Proficient in software development life cycle and project management, with excellent communication skills and a proven ability to work collaboratively with diverse teams.',
    linkedin: 'https://www.linkedin.com/in/hyna-hua/',
    gender: 'female',
    position: 'business analyst'
  },
  {
    name: 'Angela Liu',
    description: `I have:
    • Extensive commercial experience in structuring, developing and implementing interactive and user-friendly websites;
    • Practical knowledge of latest web development technologies and tools in frond-end, back-end and DevOps fields;
    • Strong teamwork spirit and collaboration ability; and I'm a Fast learner and problem solver.`,
    image: angela,
    linkedin: 'https://www.linkedin.com/in/yao--liu/',
    gender: 'female',
    position: 'developer'
  },
  {
    name: 'Tian Zhou',
    description: `Finished my Full stack boot camp lately and now building up profile and some side projects on my own. Looking forward to keep learning and improving my web dev skills.`,
    linkedin: 'https://www.linkedin.com/in/zhou-anthony-tian-19b017143/',
    gender: 'male',
    position: 'developer',
    image: joe
  },
  {
    name: 'Charles Xing',
    description: `I am an IT beginner. I have always been fascinated by technology and its potential to transform our lives, and I am eager to learn more about the field and start building my skills.`,
    image: charles,
    linkedin: 'linkedin.com/in/bin-xing-722336230',
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'Andy Wei',
    description:
      'I graduated from the University of New South Wales with a degree in Computer Science and worked on both front-end and back-end. I am interested in learning new technologies.',
    linkedin: 'https://www.linkedin.com/in/zifan-wei/',
    image: andy,
    gender: 'male',
    position: 'developer'
  },
  {
    name: 'Jason',
    gender: 'male',
    image: jason,
    position: 'developer'
  },
  {
    name: 'Zijun Li',
    description:
      'A web developer with good goal orientation and a strong desire for web development. Recent graduates who have acquired most of the modern web development skills through on-campus learning and off-campus self-study. Passionate about learning about emerging technologies and experimenting with developing projects using them. 3 years of programming experience with great analytical and problem-solving skills. Effective team player with a strong sense of responsibility and people skills.',
    linkedin: 'https://www.linkedin.com/in/zijun-li-au/',
    image: zijun,
    gender: 'male',
    position: 'developer'
  }
];

function AboutPageT3() {
  const [activeBtn, setActiveBtn] = useState('ceo');
  const [openDetail, setOpenDetail] = useState(false);
  const [detailStaff, setDetailStaff] = useState<IStaff>({
    name: '',
    image: '',
    description: ``,
    linkedin: '',
    gender: 'male',
    position: 'ceo'
  });
  const positions = ['ceo', 'business analyst', 'developer', 'all'];
  const onClickHandler = (e) => {
    e.preventDefault();
    setActiveBtn(e.currentTarget.id);
  };

  const openDetailHandler = (name) => {
    if (!openDetail) {
      setOpenDetail(true);
      const selectedStaff = staffs.filter((staff) => {
        return staff.name === name;
      })[0];
      setDetailStaff(selectedStaff);
    }
  };

  const closeDetailHandler = () => {
    if (!openDetail) return;
    setOpenDetail(false);
    setDetailStaff({
      name: '',
      image: '',
      description: ``,
      linkedin: '',
      gender: 'male',
      position: 'ceo'
    });
  };

  const positionNav = positions.map((position) => {
    return (
      <li
        key={position}
        id={position}
        onClick={onClickHandler}
        role="presentation"
        className={activeBtn === position ? styles.active : ' '}
      >
        {position}
      </li>
    );
  });

  const positionSelector = positions.map((position) => {
    return (
      <option key={position} value={position}>
        {position}
      </option>
    );
  });

  const selectedPosition = staffs
    .filter((staff) => {
      return activeBtn === 'all' ? staff : staff.position === activeBtn;
    })
    .map((staff) => {
      const { name, gender, image, position } = staff;
      return (
        <div className={styles.staffContainer} key={name}>
          <StaffInfo
            name={name}
            image={image}
            gender={gender}
            position={position}
            openDetail={openDetailHandler}
          />
        </div>
      );
    });

  const staffIntro = openDetail && (
    <StaffDetail
      name={detailStaff.name}
      image={detailStaff.image}
      linkedin={detailStaff.linkedin}
      closeDetail={closeDetailHandler}
      gender={detailStaff.gender}
      position={detailStaff.position}
      description={detailStaff.description}
    />
  );

  return (
    <div>
      <div className={`${styles.outterContainer} ${openDetail && styles.active}`}>
        <Header />
        <div className={styles.container}>
          <h2>
            Meet the <b>team3.</b>
          </h2>
          <div>
            <ul className={styles.positionFilter}>{positionNav}</ul>
            <select
              className={styles.positionSelector}
              onChange={(e) => {
                setActiveBtn(e.target.value);
              }}
              value={activeBtn}
            >
              {positionSelector}
            </select>
          </div>
          <div className={styles.listContainer}>{selectedPosition}</div>
        </div>
        {staffIntro}
      </div>
      <Footer />
    </div>
  );
}

export default AboutPageT3;
