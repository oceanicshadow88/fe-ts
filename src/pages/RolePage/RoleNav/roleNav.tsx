import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './roleNav.module.scss';
import { ProjectContext } from '../../../context/ProjectProvider';

export default function HeaderNav() {
  const { projectId = '' } = useParams();
  const projectList = useContext(ProjectContext);

  const currentProject = projectList.find((project) => project.id === projectId);

  if (projectList.length === 0) return <div />;

  return (
    <div className={styles.projectMemberHeaderNavContainer}>
      <h1>
        <Link to="/projects">Project</Link> /{' '}
        <Link to={`/projects/${projectId ?? ''}/board`}>
          {currentProject?.name ?? 'Unknown Project'}
        </Link>{' '}
        / <Link to={`/projects/${projectId ?? ''}/members`}>Members</Link> /{' '}
        <Link to=".">roles</Link>
      </h1>
    </div>
  );
}
