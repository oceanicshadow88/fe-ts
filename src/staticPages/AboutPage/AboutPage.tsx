import React from 'react';
import styles from './AboutPage.module.scss';
import MemberItem from './components/MemberItem/MemberItem';
import developers from './components/Developers/Developers';
import ProjectManager from './components/ProjectManager/ProjectManager';
import BusinessAnalyst from './components/BusinessAnalyst/BusinessAnalyst';
import DevOps from './components/DevOps/DevOps';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.teamTitle}>Team</h1>
      <section className={styles.projectManager}>
        <h2>Project Manager</h2>
        <div className={styles.memberLayout}>
          <MemberItem
            image={ProjectManager.image}
            name={ProjectManager.name}
            position={ProjectManager.position}
            bulletPoint1={ProjectManager.bulletPoint1}
            bulletPoint2={ProjectManager.bulletPoint2}
            bulletPoint3={ProjectManager.bulletPoint3}
            LinkedinURL={ProjectManager.LinkedinURL}
          />
        </div>
      </section>
      <section className={styles.businessAnalyst}>
        <h2>Business Analyst</h2>
        <div className={styles.memberLayout}>
          <MemberItem
            image={BusinessAnalyst.image}
            name={BusinessAnalyst.name}
            position={BusinessAnalyst.position}
            bulletPoint1={BusinessAnalyst.bulletPoint1}
            bulletPoint2={BusinessAnalyst.bulletPoint2}
            bulletPoint3={BusinessAnalyst.bulletPoint3}
            LinkedinURL={BusinessAnalyst.LinkedinURL}
          />
        </div>
      </section>
      <section className={styles.developer}>
        <h2>Developer</h2>
        <div className={styles.memberLayout}>
          {developers.map((member) => {
            return (
              <MemberItem
                key={member.name}
                image={member.image}
                name={member.name}
                position={member.position}
                bulletPoint1={member.bulletPoint1}
                bulletPoint2={member.bulletPoint2}
                bulletPoint3={member.bulletPoint3}
                LinkedinURL={member.LinkedinURL}
              />
            );
          })}
        </div>
      </section>
      <section className={styles.DevOps}>
        <h2>DevOps</h2>
        <div className={styles.memberLayout}>
          {DevOps.map((member) => {
            return (
              <MemberItem
                key={member.name}
                image={member.image}
                name={member.name}
                position={member.position}
                bulletPoint1={member.bulletPoint1}
                bulletPoint2={member.bulletPoint2}
                bulletPoint3={member.bulletPoint3}
                LinkedinURL={member.LinkedinURL}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
