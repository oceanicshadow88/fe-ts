import React from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MaleAvatar from '../../assets/team2/male_avatar.svg';
import FemaleAvatar from '../../assets/team2/female_avatar.svg';
import styles from './AboutPageT2.module.scss';
import Kitman from '../../assets/kitman.jpg';
import David from '../../assets/team2/david_guo.webp';
import Hyna from '../../assets/team2/hyna_hua.webp';
import Shelton from '../../assets/team2/shelton_chin.webp';
import xin from '../../assets/team2/1610041017811.jpg';

interface IPeople {
  name: string;
  image?: string;
  role: 'CEO' | 'business analyst' | 'designer' | 'developer' | 'devops';
  linkedin?: string;
  gender: 'male' | 'female';
}

const people: IPeople[] = [
  {
    name: 'kitman yiu',
    role: 'CEO',
    gender: 'male',
    image: Kitman,
    linkedin: 'https://www.linkedin.com/in/kitman-yiu/'
  },
  {
    name: 'belinda wang',
    role: 'business analyst',
    gender: 'female',
    image:
      'https://media-exp1.licdn.com/dms/image/C5603AQEnHCjauejOlw/profile-displayphoto-shrink_400_400/0/1661415876174?e=1674086400&v=beta&t=nrU0G0UTaYiFcQuH27hRlLp8pLeT0O1h0sIyAYJSX9U',
    linkedin: 'https://www.linkedin.com/in/wangbelinda/'
  },
  {
    name: 'hyna hua',
    role: 'developer',
    gender: 'female',
    image: Hyna,
    linkedin: 'https://www.linkedin.com/in/hyna-hua/'
  },
  {
    name: 'david guo',
    role: 'developer',
    gender: 'male',
    image: David,
    linkedin: 'https://www.linkedin.com/in/david-guo-au'
  },
  {
    name: 'joe zhou',
    role: 'developer',
    gender: 'male',
    image:
      'https://media-exp1.licdn.com/dms/image/C5603AQFJR_2i9aB84g/profile-displayphoto-shrink_400_400/0/1657947933253?e=1674086400&v=beta&t=yjsZhCCCTizG2mD3v6BJIQ_zLeyqtYpnGqYSuEs3Ec4',
    linkedin: 'https://www.linkedin.com/in/joe-hz/'
  },
  {
    name: 'wendy xu',
    role: 'developer',
    gender: 'male',
    image:
      'https://media-exp1.licdn.com/dms/image/D4E03AQGLeae4TQAinA/profile-displayphoto-shrink_400_400/0/1663767958415?e=1674086400&v=beta&t=QNEDdSyJY8DE1xbh22jJ1Vvf9z8bXnnw_0qyqI303xo',
    linkedin: 'https://www.linkedin.com/in/chicheng-xu/'
  },
  {
    name: 'teddy xiao',
    role: 'developer',
    gender: 'male'
  },
  {
    name: 'leo guo',
    role: 'devops',
    gender: 'male',
    image:
      'https://media-exp1.licdn.com/dms/image/C4D03AQHFLah5SPFK2g/profile-displayphoto-shrink_400_400/0/1658472295057?e=1674086400&v=beta&t=rb-ctWyua3VbMconeTLO53iWGOHXB1_6k_6VY2m6828',
    linkedin: 'https://www.linkedin.com/in/leo-guo/'
  },
  {
    name: 'james liu',
    role: 'devops',
    gender: 'male',
    image:
      'https://media-exp1.licdn.com/dms/image/D5603AQFyuq0G8YDiIw/profile-displayphoto-shrink_400_400/0/1665440003951?e=1674086400&v=beta&t=OXtZDUuFP6xRnrq4X2JyKvoU5brhjQxzOdIENy-VbGg',
    linkedin: 'https//linkedin.com/in/james-shl'
  },
  {
    name: 'jack chen',
    role: 'devops',
    gender: 'male',
    linkedin: 'https//www.linkedin.com/in/jack-chen-156224256/'
  },
  {
    name: 'shelton chin',
    role: 'devops',
    gender: 'male',
    image: Shelton,
    linkedin: 'https://www.linkedin.com/in/shelton-chin/'
  },
  {
    name: 'Xiaoxin Wang',
    role: 'designer',
    gender: 'female',
    image: xin,
    linkedin: 'https://www.linkedin.com/in/xiaoxin-wang-b1099118b/'
  }
];

// display developers first and then devops, sort by first name
// const devs = people
//   .filter((person) => person.role === 'developer' || person.role === 'devops')
//   .sort((a, b) => a.name.localeCompare(b.name))
//   .sort((a, b) => a.role.localeCompare(b.role));

function Person(props: IPeople) {
  const { name, image, gender, role, linkedin } = props;
  return (
    <div>
      <img
        className={styles.personImage}
        src={image || (gender === 'male' ? MaleAvatar : FemaleAvatar)}
        alt={name}
      />
      <p className={styles.name}>{name}</p>
      <div className={styles.description}>
        <p className={styles.role}>{role}</p>
        {linkedin && (
          <a className={styles.link} href={linkedin} target="_blank" rel="noreferrer">
            <AiFillLinkedin className={styles.icon} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function AboutPageT2() {
  return (
    <>
      <Header />
      <section className={styles.container}>
        <h1 className={styles.header}>People who make it happen</h1>
        <hr className={styles.line} />
        <div className={styles.peopleGrid}>
          {people.map((person) => {
            const { name, gender, image, role, linkedin } = person;
            return (
              <Person
                key={name}
                name={name}
                gender={gender}
                image={image}
                role={role}
                linkedin={linkedin}
              />
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

Person.defaultProps = {
  image: undefined,
  linkedin: undefined
};
