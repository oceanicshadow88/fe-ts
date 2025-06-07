/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GoTrash } from 'react-icons/go';
import styles from './DraggableRetroItem.module.scss';
import checkAccess from '../../../../utils/helpers';
import { Permission } from '../../../../utils/permission';

interface IDraggableBoardCard {
  item: any;
  index: number;
  projectId: string;
  onRemoveItem: (id: string) => void;
  draggableId: string;
}

export default function DraggableRetroItem(props: IDraggableBoardCard) {
  const { item, index, onRemoveItem, projectId, draggableId } = props;

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided2) => {
        return (
          <div
            className={styles.card}
            ref={provided2.innerRef}
            {...provided2.dragHandleProps}
            {...provided2.draggableProps}
            aria-hidden="true"
            data-testid={`ticket-${item.id}`}
          >
            <p>{item.content}</p>
            {checkAccess(Permission.DeleteRetro, projectId) && (
              <GoTrash
                onClick={() => onRemoveItem(item.id)}
                style={{ minWidth: '30px', fontSize: '20px' }}
                data-testid={`delete-retro-item-${item.id}`}
              />
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
