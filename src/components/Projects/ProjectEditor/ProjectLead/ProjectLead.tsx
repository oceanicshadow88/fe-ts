import React from 'react';
import { IOnChangeProjectLead } from '../../../../types';
import UserSelect from '../../../Form/UserSelect/UserSelect';
import styles from './ProjectLead.module.scss';

interface IProjectLead {
  onChange: (e: IOnChangeProjectLead) => void;
  value: any;
}

export default function ProjectLead(props: IProjectLead) {
  const { onChange, value } = props;

  return (
    <div className={styles.leadDropdownMenu}>
      <span> Project lead</span>
      <UserSelect onChange={onChange} value={value} allowEdit />
      <p>Make sure your project lead has access to cards in the project.</p>
    </div>
  );
}
