import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DatePicker } from '@atlaskit/datetime-picker';
import styles from './CreateEditEpic.module.scss';
import Modal from '../../../../lib/Modal/Modal';
import DefaultModalHeader from '../../../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';
import { IProjectDetails } from '../../../../context/ProjectDetailsProvider';
import { createEpic, deleteEpic, updateEpic } from '../../../../api/epic/epic';
import InputV2 from '../../../../lib/FormV2/InputV2/InputV2';
import checkAccess from '../../../../utils/helpers';
import { Permission } from '../../../../utils/permission';

interface ICreateEditEpic {
  type: string;
  onClickCloseModal: () => void;
  currentEpic?: any;
  projectId: string;
  projectDetails: IProjectDetails;
}
export default function CreateEditEpic({
  type,
  onClickCloseModal,
  currentEpic,
  projectId,
  projectDetails
}: ICreateEditEpic) {
  const dateWithDay = (date?: string | null) => {
    if (!date) {
      return '';
    }
    const fullDate = date.split('T')[0];
    return fullDate;
  };

  const [disabled, setDisabled] = useState(false);
  const [epicName, setEpicName] = useState(currentEpic ? currentEpic.title : '');
  const [startDate, setStartDate] = useState(
    currentEpic ? dateWithDay(currentEpic.startDate as unknown as string) : ''
  );
  const [endDate, setEndDate] = useState(
    currentEpic ? dateWithDay(currentEpic.dueAt as unknown as string) : ''
  );
  const [epicGoal, setEpicGoal] = useState(currentEpic ? currentEpic.goal : '');
  const [epicDescription, setEpicDescription] = useState(
    currentEpic ? currentEpic.description : ''
  );

  const onClickCreateEpic = () => {
    const data = {
      title: epicName,
      project: projectId,
      startDate,
      dueAt: endDate,
      goal: epicGoal,
      description: epicDescription
    };
    createEpic(data)
      .then((res) => {
        projectDetails.onUpsertEpic(res);
        onClickCloseModal();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };

  const onClickUpdateEpic = (epicId: string) => {
    const data = {
      title: epicName,
      startDate,
      dueAt: endDate,
      goal: epicGoal,
      description: epicDescription
    };

    updateEpic(epicId, data).then((res) => {
      projectDetails.onUpdateEpic(epicId, res);
      onClickCloseModal();
    });
  };

  const onClickDeleteEpic = (epicId: string) => {
    deleteEpic(epicId).then(() => {
      projectDetails.onRemoveEpic(epicId);
      onClickCloseModal();
    });
  };

  return (
    <Modal classesName={styles.createEditSprintModal}>
      <DefaultModalHeader
        title={`${type} Epic`}
        onClickClose={() => {
          onClickCloseModal();
        }}
      />
      <div className={styles.createEditSprintContainer}>
        <div className={styles.createEditSprintInputContainer}>
          <div className={styles.inputContainer}>
            <InputV2
              type="text"
              name="name"
              value={epicName}
              onValueChanged={(e) => {
                setEpicName(e.target.value);
              }}
              label="Epic Name"
              dataTestId="epic-name"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.label}>Start date:</p>
            <div className={styles.datePicker}>
              <DatePicker
                appearance="subtle"
                dateFormat="MM-DD-YYYY"
                placeholder="e.g 11-13-2018"
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.label}>End date:</p>
            <div className={styles.datePicker}>
              <DatePicker
                appearance="subtle"
                dateFormat="MM-DD-YYYY"
                placeholder="e.g 12-13-2018"
                minDate={startDate}
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                }}
              />
            </div>
          </div>
          <div>
            <p className={styles.label}>Epic goal:</p>
            <textarea
              name="epic-goal"
              id=""
              cols={30}
              rows={10}
              value={epicGoal}
              className={styles.textAreaInput}
              onChange={(e) => {
                setEpicGoal(e.target.value);
              }}
            />
          </div>
          <div>
            <p className={styles.label}>Epic description:</p>
            <textarea
              name="epic-description"
              id=""
              cols={30}
              rows={10}
              value={epicDescription}
              className={styles.textAreaInput}
              onChange={(e) => {
                setEpicDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button
            className={styles.cancelBtn}
            onClick={() => {
              onClickCloseModal();
              setDisabled(true);
            }}
            disabled={disabled}
          >
            Cancel
          </button>
          {type === 'Edit' && checkAccess(Permission.DeleteEpics, projectId) && (
            <button
              className={styles.deleteBtn}
              onClick={() => {
                if (!currentEpic) {
                  // eslint-disable-next-line no-console
                  console.error('No Epic');
                  return;
                }
                onClickDeleteEpic(currentEpic.id);
              }}
            >
              Delete
            </button>
          )}
          <button
            className={styles.submitBtn}
            onClick={() => {
              if (type === 'Create') {
                onClickCreateEpic();
                setDisabled(true);
              } else {
                if (!currentEpic) {
                  // eslint-disable-next-line no-console
                  console.error('No Epic');
                  return;
                }
                onClickUpdateEpic(currentEpic.id);
                setDisabled(true);
              }
            }}
            disabled={disabled}
            data-testid={`epic-${type.toLowerCase()}-btn`}
          >
            {type === 'Create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
