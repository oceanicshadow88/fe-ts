import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { HiViewBoards } from 'react-icons/hi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { IoMdList } from 'react-icons/io';
import { FaDailymotion } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { VscNewFile } from 'react-icons/vsc';
import styles from './ProjectNavigationV3.module.scss';
import DailyScrumModal from '../../components/DailyScrum/DailyScrum';
import checkAccess from '../../utils/helpers';

interface IItem {
  name: string;
  icon: React.ReactNode;
  dataTestId: string;
  url?: string;
  isDisable?: boolean;
  checkAccess?: string;
  action?: () => void;
}

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDailyScrum, setShowDailyScrum] = useState(false);
  const { projectId = '' } = useParams();

  const buttons = [
    {
      name: 'Dashboard(WIP)',
      checkAccess: 'view:dashboard',
      url: `/projects/${projectId}/dashboard`,
      icon: <MdOutlineDashboard />,
      dataTestId: 'dashboard-btn',
      isDisable: true
    },
    {
      name: 'Retro',
      checkAccess: 'view:retro',
      url: `/projects/${projectId}/retro`,
      icon: <HiViewBoards />,
      dataTestId: 'board-btn'
    },
    {
      name: 'Board',
      checkAccess: 'view:boards',
      url: `/projects/${projectId}/board`,
      icon: <HiViewBoards />,
      dataTestId: 'board-btn'
    },
    {
      name: 'Backlog',
      checkAccess: 'view:backlog',
      url: `/projects/${projectId}/backlog`,
      icon: <IoMdList />,
      dataTestId: 'backlog-btn'
    },
    {
      name: 'Daily standup(WIP)',
      checkAccess: 'view:standup',
      icon: <FaDailymotion />,
      action: () => {
        setShowDailyScrum(true);
      },
      dataTestId: 'dailyscrum-btn',
      isDisable: true
    },
    {
      name: 'Members',
      checkAccess: 'view:members',
      url: `/projects/${projectId}/members`,
      icon: <BsFillPeopleFill />,
      dataTestId: 'member-btn'
    },
    {
      name: 'Settings',
      checkAccess: 'view:settings',
      url: `/settings/${projectId}`,
      icon: <FiSettings />,
      dataTestId: 'project-settings-btn'
    },
    {
      name: 'Shortcut',
      checkAccess: 'view:shortcuts',
      url: `/projects/${projectId}/shortcuts/`,
      icon: <VscNewFile />,
      dataTestId: 'shortcut-btn'
    },
    {
      name: 'Epic(WIP)',
      checkAccess: 'view:epics',
      url: `/projects/${projectId}/epic`,
      icon: <VscNewFile />,
      dataTestId: 'epic-btn',
      isDisable: true
    }
  ];

  const renderBtn = (item: IItem) => {
    return (
      <button
        data-testid={item.dataTestId}
        className={[styles.navBtn].join(' ')}
        onClick={() => {
          if (item.isDisable) {
            return;
          }
          if (item.url) {
            navigate(item.url);
          }
          if (item.action) {
            item.action();
          }
        }}
        key={item.name}
      >
        {item.icon}
        <span>{item.name}</span>
      </button>
    );
  };

  const renderMenu = () => {
    return (
      <ul className={styles.menu}>
        {buttons.map((item) => {
          if (!checkAccess(item.checkAccess as string, projectId)) {
            return <></>;
          }
          return (
            <li
              className={[
                styles.menuItem,
                location.pathname === item.url ? styles.active : ''
              ].join(' ')}
              key={item.name}
            >
              {renderBtn(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderModals = () => {
    return (
      <>
        {showDailyScrum && (
          <DailyScrumModal
            onClickCloseModal={() => {
              setShowDailyScrum(false);
            }}
            projectId={projectId}
          />
        )}
      </>
    );
  };

  return (
    <div>
      {renderMenu()}
      {renderModals()}
    </div>
  );
}
