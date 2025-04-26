import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import styles from './Assignee.module.scss';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { IOnChangeAssignee } from '../../../../types';

interface AssigneeProps {
  onChange: (e: IOnChangeAssignee) => void;
}

export default function Assignee(props: AssigneeProps) {
  const { onChange } = props;
  const assignees = [
    { id: 1, state: 'Project lead' },
    { id: 2, state: 'Unassigned' }
  ];
  const [assignState, setAssignState] = useState(assignees[0]);
  const { visible, setVisible, myRef } = useOutsideAlerter(false);
  const handleClickOutside = () => setVisible(true);
  return (
    <div ref={myRef} className={styles.assigneeDropdownMenu}>
      <label htmlFor="defaultAssignee">
        <span className={styles.assigneeTitle}> Default assignee</span>
        <div className={styles.assigneeContainer}>
          {visible ? (
            <div className={styles.assigneeDropdownOpen}>
              <div className={styles.assigneeMenu}>
                <ul>
                  <li>
                    <button
                      type="button"
                      name="assignee"
                      className={styles.assigneeOptions}
                      onClick={() => {
                        setAssignState({ id: 0, state: '' });
                        onChange({
                          target: { value: '', name: 'assignee' }
                        });
                        setVisible(false);
                      }}
                    >
                      Unassigned
                    </button>
                  </li>
                  {assignees.map((assignee) => (
                    <li key={assignee.id}>
                      <button
                        type="button"
                        name="assignee"
                        className={styles.assigneeOptions}
                        data-testid="assignee"
                        onClick={() => {
                          setAssignState({ id: assignee.id, state: assignee.state });
                          onChange({
                            target: { value: assignee.id.toString(), name: 'assignee' }
                          });
                          setVisible(false);
                        }}
                      >
                        {assignee.state}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.assigneeInputField}>
                <input
                  dir="auto"
                  type="Text"
                  placeholder={assignState.state}
                  id="defaultAssignee"
                />
                <MdKeyboardArrowDown onClick={handleClickOutside} />
              </div>
            </div>
          ) : (
            <div className={styles.assigneeDropdownClose}>
              <div className={styles.assigneeInputClose}>
                <span>{assignState.state}</span>
                <MdKeyboardArrowDown onClick={handleClickOutside} />
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
