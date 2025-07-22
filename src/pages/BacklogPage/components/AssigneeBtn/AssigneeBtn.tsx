import React, { useState } from 'react';
import styles from './AssigneeBtn.module.scss';
import IconButton from '../../../../components/Form/Button/IconButton/IconButton';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import { IUserInfo, IAssign } from '../../../../types';
import { updateTicket } from '../../../../api/ticket/ticket';
import Avatar from '../../../../components/Avatar/Avatar';

interface IAssigneeBtn {
  assignee?: IAssign | null;
  ticketId: string;
  userList: IUserInfo[];
  showDropDownOnTop?: boolean;
  getBacklogDataApi: () => void;
  isDisabled: boolean;
}
export default function AssigneeBtn({
  assignee,
  userList,
  ticketId,
  showDropDownOnTop,
  getBacklogDataApi,
  isDisabled
}: IAssigneeBtn) {
  const [query, setQuery] = useState('');
  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onClickChangeAssignee = async (id: string, assigneeId: string | null) => {
    const data = { assign: assigneeId };
    await updateTicket(id, data);
    getBacklogDataApi();
    setVisible(false);
  };

  let name = 'Unassigned';
  if (assignee) {
    if (assignee.name) {
      name = assignee.name;
    }
  }

  return (
    <div className={styles.assigneeContainer} ref={myRef} data-testid={`assignee-btn-${ticketId}`}>
      <IconButton
        overrideStyle={styles.assignee}
        icon={<Avatar src={assignee?.avatarIcon} name={assignee?.name} />}
        tooltip={name}
        onClick={() => {
          if (isDisabled) {
            return;
          }
          setVisible(!visible);
        }}
      />
      {visible && (
        <div
          className={[styles.assigneeDropdown, showDropDownOnTop && styles.showDropDownOnTop].join(
            ' '
          )}
        >
          <div className={styles.inputContainer}>
            <input type="text" value={query} onChange={onChangeInput} />
            <Avatar />
          </div>
          <ul className={styles.assigneeDropdownList}>
            <li>
              <button
                onClick={() => {
                  onClickChangeAssignee(ticketId, null);
                }}
                className={styles.gap10}
              >
                <Avatar />
                Unassigned
              </button>
            </li>
            {userList
              .filter((user: IUserInfo) => {
                return user.name && user.name.toLowerCase().includes(query.toLowerCase());
              })
              .map((user) => {
                return (
                  <li key={user.id}>
                    <button
                      onClick={() => {
                        if (user.id) {
                          onClickChangeAssignee(ticketId, user.id);
                        }
                        setQuery('');
                        setVisible(false);
                      }}
                      className={styles.gap10}
                      data-testid={`assignee-btn-${ticketId}-${user.id}`}
                    >
                      <Avatar
                        src={user?.avatarIcon}
                        name={user?.name}
                        backgroundColor={user.backgroundColor}
                      />
                      {user.name}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
AssigneeBtn.defaultProps = {
  showDropDownOnTop: false
};
