import React, { useContext } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Form/Button/Button';
import IconButton from '../../../../components/Form/Button/IconButton/IconButton';
import styles from './SprintSection.module.scss';
import CreateEditSprint from '../CreateEditSprint/CreateEditSprint';
import { updateSprint } from '../../../../api/sprint/sprint';
import { ProjectDetailsContext } from '../../../../context/ProjectDetailsProvider';
import { ISprint } from '../../../../types';
import { ModalContext } from '../../../../context/ModalProvider';
import checkAccess from '../../../../utils/helpers';
import { Permission } from '../../../../utils/permission';

interface ISprintSection {
  sprint: ISprint;
  totalIssue: number;
  children?: React.ReactNode | string;
}
export default function SprintSection({ totalIssue, sprint, children }: ISprintSection) {
  const { projectId = '' } = useParams();
  const projectDetails = useContext(ProjectDetailsContext);
  const { showModal, closeModal } = useContext(ModalContext);
  const dateWithDay = (date?: Date | null) => {
    if (!date) {
      return '';
    }
    const fullDate = date.toString().split('T')[0];
    const dateDataArray = fullDate.split('-');
    return `${dateDataArray[1]}-${dateDataArray[2]}-${dateDataArray[0]}`;
  };

  const onClickStartSprint = (sprintId: string) => {
    const data = { currentSprint: true };
    updateSprint(sprintId, data)
      .then((res) => {
        projectDetails.onUpdateSprint(sprintId, res);
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickCompleteSprint = (sprintId: string) => {
    const data = { isComplete: true, currentSprint: false };
    updateSprint(sprintId, data)
      .then((res) => {
        projectDetails.onUpdateSprint(sprintId, res);
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };

  return (
    <section className={[styles.container, styles.sprintContainer].join(' ')}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h1>{sprint.name}</h1>
          <div className={styles.dateAndIssueCount}>
            <div className={styles.date}>
              <p>{dateWithDay(sprint.startDate)}</p>
              <BsArrowRight />
              <p> {dateWithDay(sprint.endDate)}</p>
            </div>
            <div className={styles.issueCount}> ({totalIssue} tickets)</div>
          </div>
        </div>
        {checkAccess(Permission.EditSprints, projectId) && (
          <div className={styles.toolbar}>
            {sprint.currentSprint ? (
              <Button
                onClick={() => {
                  onClickCompleteSprint(sprint.id);
                }}
              >
                Complete Sprint
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onClickStartSprint(sprint.id);
                }}
              >
                Start Sprint
              </Button>
            )}
            <IconButton
              icon={<BiDotsHorizontal />}
              tooltip="Actions"
              onClick={() => {
                showModal(
                  'create-sprint',
                  <CreateEditSprint
                    type="Edit"
                    projectDetails={projectDetails}
                    onClickCloseModal={() => {
                      closeModal('create-sprint');
                    }}
                    currentSprint={sprint}
                    projectId={projectId}
                  />
                );
              }}
            />
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
