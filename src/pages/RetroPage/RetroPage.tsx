/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './RetroPage.module.scss';
import { ProjectDetailsContext } from '../../context/ProjectDetailsProvider';
import { IMinEvent } from '../../types';
import ProjectHOC from '../../components/HOC/ProjectHOC';
import DroppableColumn from '../BoardPage/components/DroppableColumn/DroppableColumn';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';
import {
  createRetroItem,
  deleteRetroItem,
  getRetroBoards,
  getSprintRetroItems,
  updateRetroStatus
} from '../../api/retro/retro';
import CreateRetroItem from './components/CreateRetroItem/CreateRetroItem';
import DraggableRetroItem from './components/DraggableRetroItem/DraggableRetroItem';

export default function RetroPage() {
  const [retroItems, setRetroItems] = useState<any>([]);
  const [boardDetails, setBoardDetails] = useState<any>();
  const [selectedSprintId, setSelectedSprintId] = useState<string>('');
  const [selectedBoard, setSelectedBoard] = useState<any>();
  const projectDetails = useContext(ProjectDetailsContext);
  const [searchParams] = useSearchParams();
  const { projectId = '' } = useParams();

  const fetchRetroItems = async () => {
    if (!selectedSprintId) {
      return;
    }
    const res = await getSprintRetroItems(selectedSprintId);
    setRetroItems(res.data);
  };

  const fetchBoards = async () => {
    const result = projectDetails.sprints.find((item) => item.id === selectedSprintId);
    if (!result) {
      // eslint-disable-next-line no-console
      console.error('Cannot find sprint');
      return;
    }
    const res = await getRetroBoards(result.id);
    setBoardDetails(res.data);
    setSelectedBoard(res.data[0]);
  };

  useEffect(() => {
    if (projectDetails.isLoadingDetails) {
      return;
    }
    const sprintId = searchParams.get('sprintId');
    const result = sprintId
      ? projectDetails.sprints.find((item) => item.id === sprintId)
      : projectDetails.sprints.find((item) => item.currentSprint);
    if (!result) {
      return;
    }
    setSelectedSprintId(result.id);
  }, [projectDetails.isLoadingDetails, searchParams]);

  useEffect(() => {
    if (projectDetails.isLoadingDetails) {
      return;
    }
    if (!selectedSprintId) {
      return;
    }

    fetchBoards();
    fetchRetroItems();
  }, [selectedSprintId, projectDetails.isLoadingDetails]);

  if (projectDetails.isLoadingDetails) {
    return <></>;
  }
  const hasSprint = projectDetails.sprints.map((item) => item.currentSprint) && boardDetails;
  const loading = projectDetails.isLoadingDetails;

  const onRetroItemCreate = async (data, columnId: string) => {
    if (data.content === '') {
      return;
    }
    const item = await createRetroItem(selectedSprintId, {
      content: data.content,
      status: columnId
    });
    setRetroItems([...retroItems, item.data]);
  };

  const onRemoveItem = (id: string) => {
    deleteRetroItem(id);
    setRetroItems(retroItems.filter((item) => item.id !== id));
  };

  const dragEventHandler = (result: DropResult) => {
    const toId = result.destination?.droppableId;
    const retroId = result.draggableId;
    if (!toId) {
      return;
    }

    const retroItem = retroItems.find((item) => item.id === retroId);
    if (!retroItem) {
      return;
    }
    const updateItem = { ...retroItem, ...{ status: toId } };
    setRetroItems(retroItems.map((item) => (item.id === retroId ? updateItem : item)));
    updateRetroStatus(retroId, toId);
  };

  const onDefaultChange = (e: IMinEvent) => {
    setSelectedSprintId(e.target.value as string);
  };

  if (loading) {
    return <></>;
  }
  const ticketByStatus = retroItems?.groupBy('status') ?? [];

  const sprintsOptions = projectDetails.sprints
    .filter((item) => item.currentSprint)
    .map((item) => {
      return {
        label: item.name,
        value: item.id
      };
    });

  const boardsOptions = boardDetails?.map((item) => {
    return {
      label: item.title,
      value: item.id
    };
  });

  return (
    <ProjectHOC title="Board">
      <div className={styles.mainContainer}>
        {(!hasSprint || !selectedBoard || !boardDetails) && <p>No Active Sprint</p>}
        {hasSprint && (
          <>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <div style={{ maxWidth: '250px', width: '100%' }}>
                <DropdownV2
                  label="Sprint"
                  dataTestId="Sprint"
                  onValueChanged={onDefaultChange}
                  onValueBlur={() => {}}
                  value={selectedSprintId}
                  name="sprint"
                  options={sprintsOptions}
                />
              </div>
              <div style={{ maxWidth: '250px', width: '100%' }}>
                <DropdownV2
                  label="Board"
                  dataTestId="board"
                  onValueChanged={onDefaultChange}
                  onValueBlur={() => {}}
                  value={selectedBoard?.id || ''}
                  name="board"
                  options={boardsOptions}
                />
              </div>
            </div>
            <div className={styles.boardMainContainer}>
              <DragDropContext onDragEnd={dragEventHandler}>
                {selectedBoard?.statuses.map((column) => (
                  <DroppableColumn
                    key={column.id}
                    name={column.description}
                    id={column.id}
                    totalTicket={ticketByStatus[column.id]?.length ?? 0}
                    projectId={projectId}
                    sprintId={selectedSprintId}
                    createBtn={
                      <CreateRetroItem
                        onItemCreate={(data) => {
                          onRetroItemCreate(data, column.id);
                        }}
                        className={styles.cardAddNewCard}
                      />
                    }
                  >
                    {ticketByStatus[column.id]?.map((item, index) => (
                      <DraggableRetroItem
                        key={item.id}
                        item={item}
                        index={index}
                        onRemoveItem={onRemoveItem}
                        projectId={projectId}
                      />
                    ))}
                  </DroppableColumn>
                ))}
              </DragDropContext>
            </div>
          </>
        )}
      </div>
    </ProjectHOC>
  );
}
