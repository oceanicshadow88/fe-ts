import React, { createRef, useContext } from 'react';
import { BiPlus } from 'react-icons/bi';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './ProjectHeader.module.scss';
import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import PersonalProfile from './PersonalProfile/PersonalProfile';
import { IProjectData } from '../../../types';
import { UserContext } from '../../../context/UserInfoProvider';
import Icon from '../../Header/IconTab/IconTab';

export default function ProjectHeader() {
  const projectList = [{ id: '11', iconUrl: '11', name: '11', type: 'sss' }];

  const userInfo = useContext(UserContext);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = (state: boolean) => setVisible(!state);
  const navigate = useNavigate();
  const handleClickEvent = (e: React.MouseEvent<HTMLSpanElement>, project: IProjectData) => {
    e.preventDefault();
    const clickStartEventFlag = (e.target as Element).className.includes('Star');
    if (!clickStartEventFlag) {
      navigate(`/projects/${project.id}/board`);
    }
  };
  const refStar = projectList.map(() => createRef<HTMLDivElement>());
  const getStarPosition = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const mouseStarPosition = e.currentTarget.getBoundingClientRect();
    const starPosition = {
      x: mouseStarPosition.left + window.scrollX,
      y: mouseStarPosition.top + window.scrollY
    };
    const index = projectList.findIndex((project) => project.id === id);
    const { current } = refStar[index];
    if (current !== null) {
      current.style.top = `${starPosition.y - 24}px`;
      current.style.left = `${starPosition.x - 292}px`;
    }
  };

  const location = useLocation();

  return (
    <div className={styles.projectHeader}>
      <header>
        <nav ref={myRef}>
          <Link to="/projects">
            <div className={styles.logo}>
              <Icon />
            </div>
          </Link>
          <div className={styles.options}>
            {visible ? (
              <>
                <div
                  className={[
                    location.pathname.includes('projects') ? styles.underline : styles.option
                  ].join('')}
                >
                  <button
                    type="button"
                    onClick={() => {
                      handleClickOutside(true);
                    }}
                  >
                    Projects
                    <RiArrowDropDownLine />
                  </button>
                </div>
                <div className={styles.dropdownSection}>
                  <div className={styles.dropdownContainer}>
                    <div className={styles.top}>
                      {/* {starredProjects.length >= 1 && (
                        <div className={styles.starredTitle}>Starred</div>
                      )}
                      {starredProjects?.map((project) => (
                        <StartedProjectItem
                          key={project.id}
                          projectId={project.id}
                          projectName={project.name}
                          iconUrl={project.iconUrl}
                        />
                      ))} */}

                      <div className={styles.recent}>RECENT</div>
                      {projectList.slice(0, 2).map((project) => (
                        <Link
                          to="/projects/"
                          onClick={(e) => handleClickEvent(e, project)}
                          key={project.id}
                        >
                          <span className={styles.iconSection}>
                            <div className={styles.iconContainer}>
                              <span className={styles.icon}>
                                <img
                                  src={
                                    project.iconUrl ??
                                    'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10418?size=small'
                                  }
                                  alt="icon"
                                />
                              </span>
                            </div>
                          </span>
                          <span className={styles.titleContent}>
                            <span className={styles.name}>{project.name}</span>
                            <span className={styles.type}>{project.type}</span>
                          </span>
                          <div
                            className={styles.starSection}
                            onMouseOver={(e: React.MouseEvent<HTMLDivElement>) =>
                              getStarPosition(e, project.id)
                            }
                            onFocus={() => undefined}
                          >
                            <div className={styles.starContainer}>
                              {/* {project.star ? (
                                <button type="button" className={styles.starBtn}>
                                  <div className={styles.starContent}>
                                    <span className={styles.isStar}>
                                      <AiFillStar />
                                      <div className={styles.notification} ref={refStar[index]}>
                                        Remove from Starred
                                      </div>
                                    </span>
                                  </div>
                                </button>
                              ) : (
                                <button type="button" className={styles.unStarBtn}>
                                  <div className={styles.starContent}>
                                    <span className={styles.unStar}>
                                      <AiOutlineStar />
                                      <div className={styles.notification} ref={refStar[index]}>
                                        Add to Starred
                                      </div>
                                    </span>
                                  </div>
                                </button>
                              )} */}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className={styles.bottom}>
                      <span className={styles.viewSection}>
                        <Link to="/projects">
                          <span className={styles.link}>
                            <span>View all projects</span>
                          </span>
                        </Link>
                        <Link to="/create-projects">
                          <span className={styles.link}>
                            <span>Create project</span>
                          </span>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                className={[
                  location.pathname.includes('projects') ? styles.underline : styles.option
                ].join('')}
              >
                <button
                  type="button"
                  onClick={() => {
                    handleClickOutside(false);
                  }}
                >
                  Projects
                  <RiArrowDropDownLine />
                </button>
              </div>
            )}
            <div className={styles.option}>
              <button type="button">
                People
                <RiArrowDropDownLine />
              </button>
            </div>
            <div className={styles.createIssue}>
              <button
                type="button"
                className={styles.createBtn}
                onClick={() => {}}
                style={{ display: 'none' }}
              >
                <span>Create</span>
              </button>
              <button
                type="button"
                className={styles.createIcon}
                onClick={() => {}}
                style={{ display: 'none' }}
              >
                <span>
                  <BiPlus />
                </span>
              </button>
            </div>
            <div className={styles.spaceSection}>
              <div className={styles.space} />
            </div>
          </div>
        </nav>
        <PersonalProfile userInfo={userInfo} />
      </header>
    </div>
  );
}
