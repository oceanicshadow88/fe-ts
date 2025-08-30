/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdContentCopy } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import IconButton from '../../../../components/Form/Button/IconButton/IconButton';
import styles from './TicketItem.module.scss';
import OverFlowMenuBtn from '../OverFlowMenuBtn/OverFlowMenuBtn';
import PriorityBtn from '../PriorityBtn/PriorityBtn';
import AssigneeBtn from '../AssigneeBtn/AssigneeBtn';
import useOutsideAlerter from '../../../../hooks/OutsideAlerter';
import TicketTypeEdit from './TicketTypeEdit';
import { ProjectDetailsContext } from '../../../../context/ProjectDetailsProvider';
import StatusBtn from '../StatusBtn/StatusBtn';
import { ITicketBasic, ITicketDetails } from '../../../../types';
import {
  updateTicket,
  deleteTicket,
  updateTicketSprint,
  removeTicket
} from '../../../../api/ticket/ticket';
import TicketDetailCard from '../../../../components/TicketDetailCard/TicketDetailCard';
import { ModalContext } from '../../../../context/ModalProvider';
import checkAccess from '../../../../utils/helpers';
import { Permission } from '../../../../utils/permission';
import DropdownV2 from '../../../../lib/FormV2/DropdownV2/DropdownV2';

interface ITicketInput {
  ticket: ITicketBasic;
  showDropDownOnTop?: boolean;
  onTicketChanged: () => void;
  isReadOnly: boolean;
}
export default function TicketItem({
  ticket,
  showDropDownOnTop,
  onTicketChanged,
  isReadOnly
}: ITicketInput) {
  const [title, setTitle] = useState(ticket.title);
  const [value, setValue] = useState(ticket.type);
  const [epicId, setEpicId] = useState<string | null>(ticket?.epic ?? null);
  const projectDetails = useContext(ProjectDetailsContext);
  const { showModal } = useContext(ModalContext);
  const { projectId = '' } = useParams();

  const updateTicketTitleContent = async () => {
    if (title.trim() === ticket.title) {
      return;
    }
    const data = { title: title.trim() };
    await updateTicket(ticket.id, data);
    onTicketChanged();
  };

  const updateTicketType = async (newTypeId: string) => {
    const data = { type: newTypeId };
    await updateTicket(ticket.id, data);
    onTicketChanged();
  };

  const { visible, setVisible, myRef } = useOutsideAlerter(false);

  const saveKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    updateTicketTitleContent();
    setVisible(false);
    onTicketChanged();
  };

  const onClickDelete = async () => {
    await deleteTicket(ticket.id);
    onTicketChanged();
    setVisible(false);
  };

  const onClickAddToBacklog = async () => {
    await updateTicketSprint(ticket.id, null);
    onTicketChanged();
    setVisible(false);
  };

  const onClickAddToSprint = async (sprintId: string) => {
    await updateTicketSprint(ticket.id, sprintId);
    onTicketChanged();
    setVisible(false);
  };

  const onClickCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/tickets/${ticket.id}`);
    toast.success('Copied', {
      theme: 'colored',
      className: 'primaryColorBackground'
    });
  };

  const onSavedTicket = async (data: ITicketDetails) => {
    const updateData = {
      ...data,
      ...{ project: data.project.id },
      ...{ labels: data.labels?.map((tag) => tag.id) }
    };

    await updateTicket(data.id, updateData);
    onTicketChanged();
  };

  const onChangeEpic = async (ticketId: string, updatedEpicId: string | null) => {
    await updateTicket(ticketId, { epic: updatedEpicId });
    setEpicId(updatedEpicId);
  };

  useEffect(() => {
    setTitle(ticket.title);
    setValue(ticket.type);
  }, [ticket]);

  if (projectDetails.isLoadingDetails) {
    return <></>;
  }
  return (
    <div
      className={styles.container}
      onFocus={() => {}}
      onBlur={() => {}}
      data-testid={`ticket-hover-${ticket.id}`}
      data-testid-count="filter-issues"
      ref={myRef}
      onDoubleClick={() => {
        showModal(
          'ticketDetailCard',
          <TicketDetailCard
            projectId={projectId}
            ticketId={ticket.id}
            onDeletedTicket={removeTicket}
            onSavedTicket={onSavedTicket}
            isReadOnly={isReadOnly}
          />
        );
      }}
    >
      <div className={styles.taskInfo}>
        <TicketTypeEdit
          ticketId={ticket.id}
          value={value}
          onChange={(option) => setValue(option)}
          updateTicketType={updateTicketType}
          isDisabled={isReadOnly}
        />
        <p>{`${projectDetails.details.key}-${ticket.ticketNumber}`}</p>
        {visible ? (
          <input
            type="text"
            defaultValue={ticket.title}
            onKeyDown={saveKeyPress}
            className={styles.taskInput}
            data-testid={'ticket-title-input-'.concat(ticket.id)}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <div className={styles.taskTitle} data-testid={`ticket-${ticket.id}`}>
            {ticket.title}
          </div>
        )}
        {!visible && (
          <div className={styles.editButton}>
            <IconButton
              icon={<MdContentCopy size={12} />}
              ticketId={ticket.id}
              tooltip="Copy Link"
              onClick={onClickCopyLink}
            />
            {!isReadOnly && (
              <IconButton
                icon={<FaPen size={12} />}
                ticketId={ticket.id}
                tooltip="Edit"
                onClick={() => {
                  setVisible(true);
                }}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.toolBar}>
        <PriorityBtn
          showDropDownOnTop={showDropDownOnTop}
          ticketId={ticket.id}
          priority={ticket.priority ?? ''}
          getBacklogDataApi={onTicketChanged}
          isDisabled={isReadOnly}
        />
        <DropdownV2
          options={projectDetails.epics
            .filter((epic) => !epic.isComplete)
            .map((item) => {
              return {
                label: item.title,
                value: item.id
              };
            })}
          label="Epic"
          name="epic"
          onValueChanged={(e) => {
            if (ticket.id) onChangeEpic(ticket.id, e.target.value);
          }}
          value={epicId}
          hasBorder={false}
          placeHolder="None"
          addNullOptions
          color={projectDetails.epics.find((item) => item.id === epicId)?.color}
        />
        <StatusBtn
          statusId={ticket?.status}
          ticketId={ticket?.id}
          statusOptions={projectDetails.statuses}
          showDropDownOnTop={showDropDownOnTop}
          getBacklogDataApi={onTicketChanged}
          isDisabled={isReadOnly}
        />
        <AssigneeBtn
          ticketId={ticket.id}
          assignee={ticket?.assign}
          userList={projectDetails.users}
          showDropDownOnTop={showDropDownOnTop}
          getBacklogDataApi={onTicketChanged}
          isDisabled={isReadOnly}
        />
        <OverFlowMenuBtn
          ticketId={ticket.id}
          showDropDownOnTop={showDropDownOnTop}
          className={styles.optionBtn}
          items={[
            {
              name: 'Copy issue link',
              onClick: onClickCopyLink,
              show: true
            },
            {
              name: 'Add to Backlog',
              onClick: onClickAddToBacklog,
              show: Boolean(ticket.sprint?.id)
            },
            {
              name: 'Delete',
              onClick: onClickDelete,
              show: checkAccess(Permission.DeleteTickets, projectId)
            },
            ...(!isReadOnly
              ? projectDetails.sprints.map((item) => ({
                  name: `Add to ${item.name}`,
                  onClick: () => onClickAddToSprint(item.id),
                  show: !ticket.sprint?.id
                }))
              : [])
          ]}
        />
      </div>
    </div>
  );
}
TicketItem.defaultProps = {
  showDropDownOnTop: false
};
