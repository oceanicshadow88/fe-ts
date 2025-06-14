/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createRef, useEffect, useContext } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { IoIosAdd } from 'react-icons/io';
import styles from './ProjectPage.module.scss';
import { createProject, deleteProject, updateProject } from '../../api/projects/projects';
import { IProject, IProjectData } from '../../types';
import { ProjectContext, ProjectDispatchContext } from '../../context/ProjectProvider';
import checkAccess, { clickedShowMore } from '../../utils/helpers';
import ProjectEditor from '../../components/Projects/ProjectEditor/ProjectEditor';
import MainMenuV2 from '../MainMenuV2/MainMenuV2';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import Modal from '../../lib/Modal/Modal';
import DefaultModalHeader from '../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';
import DefaultModalBody from '../../lib/Modal/ModalBody/DefaultModalHeader/DefaultModalBody';
import Avatar from '../../components/Avatar/Avatar';
import { importProjects } from '../../api/importProject/importProject';
import { exportProject } from '../../api/exportProject/exportProject';
import { UserContext } from '../../context/UserInfoProvider';
import { Permission } from '../../utils/permission';

export default function ProjectPage() {
  const fetchProjects = useContext(ProjectDispatchContext);
  const projectList = useContext<IProject[]>(ProjectContext);
  const [showProjectDetails, setShowProjectDetails] = useState(-1);
  const [value, setValue] = useState(0);
  const refProfile = projectList.map(() => createRef<HTMLDivElement>());
  const refShowMore = projectList.map(() => createRef<HTMLDivElement>());
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string>('');
  const navigate = useNavigate();
  const userInfo = useContext(UserContext);
  const { isCurrentUserOwner } = userInfo;

  const allowedType = ['text/csv'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (isCurrentUserOwner !== undefined) {
      localStorage.setItem('isCurrentUserOwner', JSON.stringify(isCurrentUserOwner));
    }
  }, [isCurrentUserOwner]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (!urlToken) {
      return;
    }
    const storedToken = localStorage.getItem('access_token');
    if (urlToken !== storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }
    if (!allowedType.includes(files[0].type)) {
      toast.error('File type is not supported, please upload a CSV file', { theme: 'colored' });
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      await importProjects(formData);
      toast.success('Upload successful! Fresh to see imported project', { theme: 'colored' });
    } catch (err) {
      toast.error('Upload failed. Please try again.', { theme: 'colored' });
    }
  };

  const handleExportProject = async (projectId: string) => {
    await exportProject(projectId);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setProjectStar = (id: string) => {
    // const projectIndex = projectList.findIndex((project: IProjectData) => project.id === id);
    // projectList[projectIndex].star = !projectList[projectIndex].star; //TODO: this is attach to user not global
    setValue(value + 1);
  };

  const removeProject = async (id: string) => {
    try {
      setLoading(true);
      await deleteProject(id);
      await fetchProjects();
      toast.success('Project has been deleted', {
        theme: 'colored',
        className: 'primaryColorBackground'
      });
    } catch (error) {
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      setShowDeleteModal(false);
      setLoading(false);
      setSubmitting(false);
    }
  };

  const starProject = (id: string, data: IProjectData) => {
    setProjectStar(id);
    updateProject(id, data).then(() => {
      fetchProjects();
    });
  };

  const viewDetailPosition = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const mouseDetailPosition = e.currentTarget.getBoundingClientRect();

    const viewPosition = {
      x: mouseDetailPosition.left + window.scrollX,
      y: mouseDetailPosition.top + window.scrollY
    };
    const { current } = refProfile[id];
    if (current !== null) {
      current.style.top = `${viewPosition.y - 170}px`;
      current.style.left = `${viewPosition.x + 50}px`;
    }
  };

  const handleClickInside = (e: MouseEvent) => {
    if (!clickedShowMore(e, refShowMore)) {
      setShowProjectDetails(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickInside);
    return () => document.removeEventListener('mousedown', handleClickInside);
  });

  const onClickProjectSave = async (apiData: IProjectData) => {
    try {
      setLoading(true);
      const res: AxiosResponse = await createProject(apiData);
      if (!res.data) {
        return;
      }
      await fetchProjects();
      toast.success('Project has been created', {
        theme: 'colored',
        className: 'primaryColorBackground'
      });
    } catch (error) {
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    } finally {
      setShowCreateProjectModal(false);
      setLoading(false);
    }
  };

  const renderModals = () => {
    return (
      <>
        {showCreateProjectModal && (
          <Modal fullWidth>
            <DefaultModalHeader
              title="Create Project"
              onClickClose={() => {
                setShowCreateProjectModal(false);
              }}
            />
            <DefaultModalBody defaultPadding={false} classesName={styles.modalPadding}>
              <ProjectEditor
                showCancelBtn
                onClickSave={onClickProjectSave}
                onClickCancel={() => {
                  setShowCreateProjectModal(false);
                }}
                loading={loading}
              />
            </DefaultModalBody>
          </Modal>
        )}
        {showDeleteModal && (
          <Modal classesName={styles.modal}>
            <p>Are you sure you want to delete the project?</p>
            <div className={styles.modalBtn}>
              <ButtonV2
                text="Confirm"
                danger
                onClick={() => {
                  setSubmitting(true);
                  removeProject(deleteProjectId);
                }}
                disabled={submitting}
                dataTestId="confirm-delete"
              />
              <ButtonV2
                text="Cancel"
                fill
                onClick={() => {
                  setShowDeleteModal(false);
                }}
                dataTestId="confirm-cancel"
              />
            </div>
          </Modal>
        )}
      </>
    );
  };

  const renderHeaderMenu = () => {
    return (
      <div className={styles.header}>
        <div className={styles.title} data-testid="project-title">
          <h1>Projects</h1>

          {checkAccess(Permission.CreateProjects) && (
            <ButtonV2
              customStyles={styles.createProjectBtn}
              text="New project"
              onClick={() => setShowCreateProjectModal(true)}
              icon={<IoIosAdd className={styles.createCardIcon} />}
              fill
              dataTestId="board-create-card"
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv, .json"
            onChange={(e) => {
              handleFileUpload(e.target.files);
            }}
            style={{ display: 'none' }}
          />
          <ButtonV2
            customStyles={styles.importProjectBtn}
            text="Import project"
            onClick={() => fileInputRef.current?.click()}
            icon={<IoIosAdd className={styles.createCardIcon} />}
            fill
          />
        </div>
      </div>
    );
  };

  const renderShowMore = (projectId, index: number) => {
    return (
      <td
        className={styles.changeView}
        onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => viewDetailPosition(e, index)}
        onFocus={() => undefined}
      >
        {showProjectDetails === projectId && (
          <div className={styles.viewDetail} ref={refShowMore[index]}>
            {checkAccess(Permission.ViewProjects, projectId) && (
              <Link to={`/settings/${projectId}`}>
                <button type="button" data-testid="project-details">
                  View Detail
                </button>
              </Link>
            )}
            {checkAccess(Permission.DeleteProjects, projectId) && (
              <button
                type="button"
                data-testid="project-delete"
                onClick={() => {
                  setDeleteProjectId(projectId);
                  setShowDeleteModal(true);
                }}
              >
                Delete Project
              </button>
            )}
            <button
              type="button"
              data-testid="project-export"
              onClick={() => {
                handleExportProject(projectId);
              }}
            >
              Export Project
            </button>
          </div>
        )}
        {(checkAccess(Permission.ViewProjects, projectId) ||
          checkAccess(Permission.DeleteProjects, projectId)) && (
          <HiDotsHorizontal
            onClick={() => {
              setShowProjectDetails(projectId);
            }}
            className={styles.verticalMiddle}
            data-testid={`project-expand-btn-${projectId}`}
          />
        )}
      </td>
    );
  };

  const renderTable = () => {
    return (
      <div className={styles.mainContent}>
        <table aria-label="Projects details">
          <thead>
            <tr>
              <th className={styles.stars}>
                <span>
                  <AiFillStar />
                </span>
              </th>
              <th className={styles.names}>
                <span>Name</span>
              </th>
              <th className={styles.keys}>
                <span>Key</span>
              </th>
              <th className={styles.types}>
                <span>Type</span>
              </th>
              <th className={styles.leads}>
                <span>Lead</span>
              </th>
              <th className={styles.buttons}>
                <span />
              </th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project: IProjectData, index: number) => (
              <tr key={project.id} className={styles.overflowVisible}>
                <td className={[styles.star, styles.overflowVisible].join(' ')}>
                  <div
                    className={[styles.changeStar, styles.overflowVisible].join(' ')}
                    onFocus={() => undefined}
                  >
                    <span>
                      {project.star ? (
                        <button
                          type="button"
                          className={[styles.starBtn, styles.overflowVisible].join(' ')}
                          onClick={() => {
                            starProject(project.id, { star: false }); // TODO: this is not base on project but user
                          }}
                        >
                          <div className={[styles.starStyle, styles.overflowVisible].join(' ')}>
                            <span className={styles.isStar}>
                              <AiFillStar />
                              <div className={styles.notification}>Remove from Starred</div>
                            </span>
                          </div>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={[styles.unStarBtn, styles.overflowVisible].join(' ')}
                          onClick={() => {
                            starProject(project.id, { star: true }); // TODO: this is not base on project but user
                          }}
                        >
                          <div className={[styles.starStyle, styles.overflowVisible].join(' ')}>
                            <span className={styles.unStar}>
                              <AiOutlineStar />
                              <div className={styles.notification}>Add to Starred</div>
                            </span>
                          </div>
                        </button>
                      )}
                    </span>
                  </div>
                </td>
                <td
                  className={styles.name}
                  data-testid={project.name.replace(' ', '-').toLowerCase()}
                >
                  <Link to={`/projects/${project.id}/board`}>
                    <div className={styles.nameContent}>
                      <img
                        src={
                          project.iconUrl ||
                          'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10411?size=xxlarge'
                        }
                        alt="icon"
                      />
                      <span data-testid="project-name">{project.name}</span>
                    </div>
                  </Link>
                </td>
                <td className={styles.key}>
                  <span className={styles.keyName}>{project.key}</span>
                </td>
                <td className={styles.type}>
                  <div className={styles.typeContent}>
                    <span>{project.type}</span>
                  </div>
                </td>
                <td className={[styles.lead, styles.overflowVisible].join(' ')}>
                  <div className={styles.leadContainer} onFocus={() => undefined}>
                    <div className={styles.leadContent}>
                      <div
                        className={[styles.user, styles.overflowVisible, styles.relative].join(' ')}
                      >
                        <Avatar user={project?.projectLead} size={30} />
                        <div className={[styles.absolute, styles.profileV2].join(' ')}>
                          <div className={styles.profileV2Header}>
                            <Avatar user={project?.projectLead} size={30} />
                            <p>{project?.projectLead?.name || ''}</p>
                          </div>
                          <div className={[styles.profileV2Link, styles.textRight].join(' ')}>
                            <Link to={`/user/${project?.projectLead?.id}`}>
                              <button type="button">View profile</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                {renderShowMore(project.id, index)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.projectPage}>
      <MainMenuV2 />
      <div className={styles.projectContainer}>
        <div className={styles.projectContent}>
          {renderHeaderMenu()}
          {renderTable()}
        </div>
      </div>
      {renderModals()}
    </div>
  );
}
