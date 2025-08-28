import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import checkAccess from '../../../../utils/helpers';
import styles from './DroppableColumn.module.scss';

interface IDroppableColumn {
  name: string;
  id: string;
  projectId: string;
  createBtn: React.ReactNode;
  children: React.ReactNode;
  totalTicket: number;
  sprintId: string;
}

export default function DroppableColumn(props: IDroppableColumn) {
  const { name, id, projectId, children, totalTicket, createBtn } = props;

  return (
    <div className={styles.columnsContainer} data-testid={`board-col-${id}`}>
      <div className={styles.columnInfo}>
        <h1 className={styles.name}>{name}</h1>
        <h1 className={styles.num}>{totalTicket}</h1>
      </div>
      <Droppable droppableId={id} key={id}>
        {(provided) => {
          return (
            <div
              /* eslint-disable react/jsx-props-no-spreading */
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.column}
            >
              {children}
              {provided.placeholder}
              {checkAccess('add:tickets', projectId) && createBtn}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
