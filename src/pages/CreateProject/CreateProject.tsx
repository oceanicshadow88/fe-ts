import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../api/projects/projects';
import ProjectEditor from '../../components/Projects/ProjectEditor/ProjectEditor';
import { IProjectData } from '../../types';
import styles from './CreateProject.module.scss';

export default function CreateProject() {
  const navigate = useNavigate();
  const [hasError, setError] = useState(false);
  const onClickSave = (data: IProjectData) => {
    createProject(data)
      .then((res: AxiosResponse) => {
        if (!res.data) {
          return;
        }
        setError(false);
        navigate('/projects');
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <div className={styles.createProjectPage}>
      <ProjectEditor showCancelBtn onClickSave={onClickSave} hasError={hasError} />
    </div>
  );
}
