import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { BsBriefcase } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import styles from './SubSettingMenu.module.scss';

interface ISubSettingMenu {
  items?: any;
}

export default function SubSettingMenu(props: ISubSettingMenu) {
  const { items = null } = props;
  const { projectId = '' } = useParams();

  const buttons = items || {
    planning: [
      {
        name: 'User Profile',
        url: `/me`,
        icon: <CgProfile />,
        dataTestId: 'user-profile',
        active: true
      },
      {
        name: 'Preference (WIP)',
        url: `/projects/${projectId}/backlog`,
        icon: <AiOutlineSetting />,
        dataTestId: 'preference'
      }
    ],
    utilBtns: [
      {
        name: 'Company Details (WIP)',
        checkAccess: 'view:members',
        url: `/projects/${projectId}/members`,
        icon: <BsBriefcase />,
        dataTestId: 'company-details'
      }
    ]
  };

  const renderList = (item: string) => {
    return buttons[item].map((btn) => {
      return (
        <NavLink
          end
          to={btn.url}
          data-testid={btn.dataTestId}
          className={[styles.navBtn, btn.active ? styles.active : ''].join(' ')}
          key={btn.name}
        >
          {btn.icon}
          <span>{btn.name}</span>
        </NavLink>
      );
    });
  };

  const renderLine = (index: number) => {
    return index !== Object.keys(buttons).length - 1 && <div className={styles.dividingLine} />;
  };

  return (
    <nav className={styles.container}>
      <h1 className={styles.header}>Settings</h1>
      {Object.keys(buttons).map((item, index) => {
        return (
          <div className={styles.section} key={item}>
            {renderList(item)}
            {renderLine(index)}
          </div>
        );
      })}
    </nav>
  );
}

SubSettingMenu.defaultProps = {
  items: null
};
