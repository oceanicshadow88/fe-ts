/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { removeTicket, updateTicket } from '../../../../api/ticket/ticket';
import TicketDetailCard from '../../../../components/TicketDetailCard/TicketDetailCard';
import styles from './DraggableBoardCard.module.scss';
import { ModalContext } from '../../../../context/ModalProvider';
import { ITicketBoard, ITicketDetails } from '../../../../types';
import Avatar from '../../../../components/Avatar/Avatar';

interface IDraggableBoardCard {
  item: ITicketBoard;
  index: number;
  projectId: string;
  onTicketUpdated: () => void;
}

export default function DraggableBoardCard(props: IDraggableBoardCard) {
  const { item, index, projectId, onTicketUpdated } = props;
  const { showModal } = useContext(ModalContext);

  const handleDeletedTicket = async (id: string) => {
    await removeTicket(id);
    onTicketUpdated();
  };

  const handleSavedTicket = async (data: ITicketDetails) => {
    const updateData = {
      ...data,
      ...{ project: data.project.id },
      ...{ labels: data.labels?.map((tag) => tag.id) }
    };
    await updateTicket(data.id, updateData);
    onTicketUpdated();
  };
  return (
    <Draggable draggableId={item.id ?? ''} index={index}>
      {(provided2) => {
        return (
          <div
            className={styles.card}
            ref={provided2.innerRef}
            {...provided2.dragHandleProps}
            {...provided2.draggableProps}
            aria-hidden="true"
            onClick={() => {
              showModal(
                'ticketDetailCard',
                <TicketDetailCard
                  projectId={projectId}
                  ticketId={item.id}
                  onDeletedTicket={handleDeletedTicket}
                  onSavedTicket={handleSavedTicket}
                />
              );
            }}
            data-testid={`ticket-${item.id}`}
          >
            <span data-testid="ticket-labels">
              {' '}
              {item.tags?.map((tag) => {
                return (
                  <div className={styles.tag} key={tag.id}>
                    <span>{tag.name}</span>
                  </div>
                );
              })}
            </span>
            <p>
              {item?.title &&
                item.title
                  .split(' ')
                  .map((word: string) => {
                    return word.length > 27 ? `${word.substring(0, 27)}...` : word;
                  })
                  .join(' ')}
            </p>
            <div className={styles.cardFooter}>
              <div className={styles.cardFooterLeft}>
                <span>
                  Due Date: {item.dueAt?.toString().split('T')[0].split('-').reverse().join('/')}
                </span>
              </div>
              <div className={styles.cardFooterRight}>
                <Avatar user={item.assign} />
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
