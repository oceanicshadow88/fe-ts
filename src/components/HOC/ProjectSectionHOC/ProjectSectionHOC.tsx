import React, { useContext } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateEpic } from '../../../api/epic/epic';
import { ModalContext } from '../../../context/ModalProvider';
import { ProjectDetailsContext } from '../../../context/ProjectDetailsProvider';
import CreateEditEpic from '../../../pages/EpicPage/components/CreateEditEpic/CreateEditEpic';
import Button from '../../Form/Button/Button';
import IconButton from '../../Form/Button/IconButton/IconButton';
import styles from './ProjectSectionHOC.module.scss';

interface IProjectSectionHOC {
  title: string;
  startDate?: Date;
  endDate?: Date | null;
  totalIssue: number;
  epic: any;
  dataTestId?: string;
  children: React.ReactNode;
}

export default function ProjectSectionHOC(props: IProjectSectionHOC) {
  const { projectId = '' } = useParams();
  const { title, startDate, endDate, totalIssue, epic, dataTestId, children } = props;
  const projectDetails = useContext(ProjectDetailsContext);
  const { showModal, closeModal } = useContext(ModalContext);

  const dateWithDay = (date?: Date | null) => {
    if (!date) {
      return '';
    }
    const fullDate = date.toString().split('T')[0];
    return fullDate;
  };

  const onClickStartEpic = (epicId: string) => {
    const data = { currentEpic: true };
    updateEpic(epicId, data)
      .then((res) => {
        projectDetails.onUpdateEpic(epicId, res);
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };

  const onClickCompleteEpic = (epicId: string) => {
    const data = { isComplete: true, currentEpic: false };
    updateEpic(epicId, data)
      .then((res) => {
        projectDetails.onUpdateEpic(epicId, res);
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };

  return (
    <section
      className={[styles.container, styles.sprintContainer].join(' ')}
      data-testid={dataTestId}
    >
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>{title}</h1>
          <div className={styles.dateAndIssueCount}>
            <div className={styles.date}>
              <p>{dateWithDay(startDate)}</p>
              <BsArrowRight />
              <p> {dateWithDay(endDate)}</p>
            </div>
            <div className={styles.issueCount}> ({totalIssue} tickets)</div>
          </div>
        </div>
        <div className={styles.toolbar}>
          {epic.currentEpic ? (
            <Button
              onClick={() => {
                onClickCompleteEpic(epic.id);
              }}
            >
              Complete Epic
            </Button>
          ) : (
            <Button
              onClick={() => {
                onClickStartEpic(epic.id);
              }}
            >
              Start Epic
            </Button>
          )}
          <IconButton
            icon={<BiDotsHorizontal />}
            tooltip="Actions"
            onClick={() => {
              showModal(
                'create-epic',
                <CreateEditEpic
                  type="Edit"
                  projectDetails={projectDetails}
                  onClickCloseModal={() => {
                    closeModal('create-epic');
                  }}
                  currentEpic={epic}
                  projectId={projectId}
                />
              );
            }}
          />
        </div>
      </div>
      {children}
    </section>
  );
}
