import React from 'react';
import JobListItem from '../JobListItem/JobListItem';
import styles from './JobListTable.module.scss';

const jobs = [
  {
    title: 'Junior Software developer(Intern)',
    department: 'Developer',
    location: 'Denver',
    total: 1,
    desc: 'This role is suitable for people who have no previous experience in IT or people that are switching to IT. Mainly responsible is creating static pages and doing simple functions.',
    list: [
      'Have a clear idea of what you wanted and a basic plan of what you need to do in this inter',
      'Able to ask for help when needed',
      'Effective communication skills',
      'Being a team player to achieve shared team goals',
      'Project management process improvement',
      'Experience in HTML',
      'Experience in CSS',
      'Experience in Next.js(Recommend)',
      'Self-motivated'
    ],
    id: '1'
  },
  {
    title: 'Mid Software developer(Intern)',
    department: 'Developer',
    location: 'Denver',
    total: 4,
    desc: 'This role are suitable people who are currently or finished studying IT and wanted to get a job after the bootcamp. The mainly responsible for this role is to creating and maintaining new functionality.',
    list: [
      'Have a clear idea of what you wanted and a basic plan of what you need to do in this inter',
      'Able to do self-research before asking Senior Devs',
      'Able to ask for help when needed',
      'Effective communication skills',
      'Exceptional problem-solving and analysis skills',
      'A proactive attitude',
      'Experience in HTML',
      'Experience in CSS',
      'Experience in React(Recommend)',
      'Experience in Typescript(Recommend)',
      'Experience in Node.js(Recommend)',
      'Project management process improvement.',
      'Will have a chance to learn CI/CD pipeline',
      'Will have a chance to learn AWS',
      'Self-motivated'
    ],
    id: '2'
  },

  {
    title: 'Software Team Lead(Intern)',
    department: 'Developer',
    location: 'Cork (Remote)',
    desc: 'Mainly responsible for creating and maintaining new functionality. Ensure that the teams can finish tickets on time.',
    total: 1,
    list: [
      'Have a clear idea of what you wanted and a basic plan of what you need to do in this inter',
      'Able to do self-research before asking Senior Devs',
      'Able to ask for help when needed',
      'Effective communication skills',
      'Exceptional problem-solving and analysis skills',
      'A proactive attitude',
      'Experience in HTML',
      'Experience in CSS',
      'Experience in React(Recommend)',
      'Experience in Typescript(Recommend)',
      'Experience in Node.js(Recommend)',
      'Ensure that your other team members finish tickets on time',
      'Creating a great team culture',
      'Project management process improvement',
      'Will have a chance to learn CI/CD pipeline',
      'Will have a chance to learn AWS',
      'Self-motivated'
    ],
    id: '3'
  },
  {
    title: 'Project Manager(Intern)',
    department: 'Product',
    location: 'Cork (Remote)',
    list: [
      'Have a clear idea of what you wanted and a basic plan of what you need to do in this inter',
      'Assist in planning and executing the product roadmap',
      'Develop innovative solutions to our user’s problems, delivering immediate benefits',
      'Exceptional problem-solving and analysis skills',
      'Categorizing support tickets and drawing out themes',
      'Briefing new product ideas to development teams',
      'A proactive attitude',
      'Experience in using JIRA',
      'Experience in SCRUM',
      'Self-motivated',
      'Algin to our core value'
    ],
    total: 1,
    desc: 'Mainly responsible for creating and maintaining new functionality. Ensure that the teams can finish tickets on time.',
    id: '4'
  },
  {
    title: 'Designer(Intern)',
    department: 'Design',
    location: 'Cork (Remote)',
    total: 1,
    list: [
      'Have a clear idea of what you wanted and a basic plan of what you need to do in this inter',
      'Strong creative skills',
      'Well-presented and personable with excellent communication and organizational skills',
      'Experience in Figma or similar',
      'Experience in PhotoShop or similar',
      'Resilient to cope with conflicting demands and able to prioritise duties, work effectively and meet deadlines',
      'Understand what you wanted after this inter',
      'Self-motivated'
    ],
    desc: 'Mainly responsible for creating and maintaining new functionality. Ensure that the teams can finish tickets on time.',
    id: '5'
  },
  {
    title: 'Devops(Intern)',
    department: 'Devops',
    location: 'Cork (Remote)',
    total: 1,
    desc: 'Creating the website from scratch.',
    list: [
      'Have a clear idea of what you wanted and a basic plan of what you need to do in this inter',
      'Able to do self-research before asking Senior Devs',
      'Able to ask for help when needed',
      'Effective communication skills',
      'Exceptional problem-solving and analysis skills',
      'Implement scalable, resilient, and secure solutions in the public cloud in AWS',
      'Ability to analyze and troubleshoot complex software and infrastructure issues, and develop tools/systems for ticket automation',
      'Self-motivated'
    ],
    id: '6'
  }
];
function JobListTable() {
  return (
    <div className={styles.jobListTable}>
      {jobs.map((job) => {
        return (
          <JobListItem
            department={job.department}
            title={job.title}
            id={job.id}
            key={job.id}
            desc={job.desc}
            list={job.list}
          />
        );
      })}
    </div>
  );
}

export default JobListTable;
