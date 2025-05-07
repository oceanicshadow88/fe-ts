import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { BiChevronDown } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { DatePicker } from '@atlaskit/datetime-picker';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import styles from './CreateEditSprint.module.scss';
import Modal from '../../../../lib/Modal/Modal';
import { createSprint, updateSprint, deleteSprint } from '../../../../api/sprint/sprint';
import DefaultModalHeader from '../../../../lib/Modal/ModalHeader/DefaultModalHeader/DefaultModalHeader';
import { IProjectDetails } from '../../../../context/ProjectDetailsProvider';
import { IMinEvent, ISprint } from '../../../../types';
import DropdownV2 from '../../../../lib/FormV2/DropdownV2/DropdownV2';
import InputV2 from '../../../../lib/FormV2/InputV2/InputV2';
import checkAccess from '../../../../utils/helpers';
import { Permission } from '../../../../utils/permission';

interface ICreateEditSprint {
  type: string;
  onClickCloseModal: () => void;
  currentSprint?: ISprint;
  projectId: string;
  projectDetails: IProjectDetails;
}
export default function CreateEditSprint({
  type,
  onClickCloseModal,
  currentSprint,
  projectId,
  projectDetails
}: ICreateEditSprint) {
  const dateWithDay = (date?: string | null) => {
    if (!date) {
      return '';
    }
    const fullDate = date.split('T')[0];
    return fullDate;
  };
  const dateAfter = useCallback((date: string, days: string) => {
    if (date) {
      const newDate = new Date(date);
      if (days === '1 week') {
        newDate.setDate(newDate.getDate() + 7);
        return dateWithDay(newDate.toISOString());
      }
      if (days === '2 weeks') {
        newDate.setDate(newDate.getDate() + 14);
        return dateWithDay(newDate.toISOString());
      }
      if (days === '3 weeks') {
        newDate.setDate(newDate.getDate() + 21);
        return dateWithDay(newDate.toISOString());
      }
    }
    return undefined;
  }, []);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const [disabled, setDisabled] = useState(false);
  const [duration, setDuration] = useState('Custom');
  const [sprintName, setSprintName] = useState(currentSprint ? currentSprint.name : '');
  const [startDate, setStartDate] = useState(
    currentSprint ? dateWithDay(currentSprint.startDate as unknown as string) : ''
  );
  const [endDate, setEndDate] = useState(
    currentSprint ? dateWithDay(currentSprint.endDate as unknown as string) : ''
  );
  const [boardId, setBoardId] = useState('');
  const [retroBoardId, setRetroBoardId] = useState('');
  const [sprintGoal, setSprintGoal] = useState(currentSprint ? currentSprint.sprintGoal : '');
  const durationList = ['1 week', '2 weeks', '3 weeks', 'Custom'];

  useEffect(() => {
    if (projectDetails.isLoadingDetails) {
      return;
    }
    setBoardId(projectDetails.boards[0].id);
    setRetroBoardId(projectDetails.details.defaultRetroBoard);
  }, [projectDetails]);

  useEffect(() => {
    setEndDate(dateAfter(startDate, duration) ?? endDate);
  }, [dateAfter, duration, endDate, startDate]);

  const onClickCreateSprint = () => {
    const data = {
      name: sprintName,
      projectId,
      board: boardId,
      startDate,
      endDate,
      retroBoard: retroBoardId
    };
    createSprint(data)
      .then((res) => {
        projectDetails.onUpsertSprint(res);
        onClickCloseModal();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };

  const onClickUpdateSprint = (id: string) => {
    const data = {
      name: sprintName,
      board: boardId,
      startDate,
      endDate,
      sprintGoal
    };
    updateSprint(id, data)
      .then((res) => {
        projectDetails.onUpdateSprint(id, res);
        onClickCloseModal();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };
  const onClickDeleteSprint = (id: string) => {
    deleteSprint(id)
      .then(() => {
        projectDetails.onRemoveSprint(id);
        onClickCloseModal();
      })
      .catch(() => {
        toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
      });
  };

  const onChangeBoard = (e: IMinEvent) => {
    setBoardId(e.target.value);
  };

  const onChangeRetroBoard = (e: IMinEvent) => {
    setRetroBoardId(e.target.value);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Modal classesName={styles.createEditSprintModal}>
          <DefaultModalHeader
            title={`${type} Sprint (Missing Validation)`}
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
                  value={sprintName}
                  // className={styles.textInput}
                  onValueChanged={(e) => {
                    setSprintName(e.target.value);
                  }}
                  label="Sprint Name"
                  dataTestId="sprint-name"
                  required
                />
              </div>
              <DropdownV2
                label="Board"
                name="board"
                onValueChanged={onChangeBoard}
                value={boardId}
                options={projectDetails.boards.map((item) => {
                  return { value: item.id, label: item.title };
                })}
                required
              />
              <DropdownV2
                label="Retro Board"
                name="Retro board"
                onValueChanged={onChangeRetroBoard}
                value={retroBoardId}
                options={projectDetails.retroBoards.map((item) => {
                  return { value: item.id, label: item.title };
                })}
                required
              />
              <div className={[styles.duration, styles.inputContainer].join(' ')} ref={myRef}>
                <p className={styles.label}>Duration:</p>
                <button
                  className={[styles.selectInput, visible && styles.outline].join(' ')}
                  onClick={() => {
                    setVisible(!visible);
                  }}
                >
                  {duration}
                  <BiChevronDown />
                </button>
                {visible && (
                  <ul className={styles.dropDownDuration}>
                    {durationList.map((item) => {
                      return (
                        <li key={item}>
                          <button
                            onClick={() => {
                              setDuration(item);
                              setVisible(false);
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
                    maxDate={dateAfter(startDate, duration)}
                    value={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                  />
                </div>
              </div>
              <div>
                <p className={styles.label}>Sprint goal:</p>
                <textarea
                  name="sprint-goal"
                  id=""
                  cols={30}
                  rows={10}
                  value={sprintGoal}
                  className={styles.textAreaInput}
                  onChange={(e) => {
                    setSprintGoal(e.target.value);
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
              {type === 'Edit' && checkAccess(Permission.DeleteSprints, projectId) && (
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    if (!currentSprint) {
                      // eslint-disable-next-line no-console
                      console.error('No Sprint');
                      return;
                    }
                    onClickDeleteSprint(currentSprint.id);
                  }}
                >
                  Delete
                </button>
              )}
              <button
                className={styles.submitBtn}
                onClick={() => {
                  if (type === 'Create') {
                    onClickCreateSprint();
                    setDisabled(true);
                  } else {
                    if (!currentSprint) {
                      // eslint-disable-next-line no-console
                      console.error('No Sprint');
                      return;
                    }
                    onClickUpdateSprint(currentSprint.id);
                    setDisabled(true);
                  }
                }}
                disabled={disabled}
              >
                {type === 'Create' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </Modal>,
        document.getElementById('root') as Element
      )}
    </>
  );
}
