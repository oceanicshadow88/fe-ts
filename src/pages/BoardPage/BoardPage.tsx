import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import { ProjectDetailsContext } from '../../context/ProjectDetailsProvider';
import { getBoardDetails, getSprintTickets } from '../../api/board/board';
import { createNewTicket, updateTicketStatus } from '../../api/ticket/ticket';
import TicketSearch, { IFilterData } from '../../components/Board/BoardSearch/TicketSearch';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';
import { IBoard, IMinEvent, ITicketBoard } from '../../types';
import DroppableColumn from './components/DroppableColumn/DroppableColumn';
import DraggableBoardCard from './components/DraggableBoardCard/DraggableBoardCard';
import ProjectHOC from '../../components/HOC/ProjectHOC';
import CreateBoardTicket from './components/CreateBoardTicket/CreateBoardTicket';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';

export default function BoardPage() {
  const [tickets, setTickets] = useState<ITicketBoard[]>([]);
  const [boardDetails, setBoardDetails] = useState<IBoard>();
  const [selectedSprint, setSelectedSprint] = useState<any>('');
  const projectDetails = useContext(ProjectDetailsContext);
  const { projectId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const getSprintById = (id: string) => {
    const result = projectDetails.sprints.find((item) => item.id === id);
    if (!result) {
      return null;
    }
    return result;
  };

  const fetchSprintTickets = async (filterData) => {
    if (!selectedSprint) {
      return;
    }
    const res = await getSprintTickets(selectedSprint.id, filterData);
    setTickets(res);
  };

  const fetchBoards = async () => {
    const res = await getBoardDetails(selectedSprint.board);
    setBoardDetails(res.data);
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
    setSelectedSprint(result);
  }, [projectDetails.isLoadingDetails, searchParams]);

  useEffect(() => {
    if (projectDetails.isLoadingDetails) {
      return;
    }
    if (!selectedSprint) {
      return;
    }

    fetchBoards();
    fetchSprintTickets(null);
  }, [selectedSprint, projectDetails.isLoadingDetails]);

  if (projectDetails.isLoadingDetails) {
    return <></>;
  }
  const hasSprint = projectDetails.sprints.map((item) => item.currentSprint) && boardDetails;
  const loading = projectDetails.isLoadingDetails;

  const onTicketCreate = async (data) => {
    const res = await createNewTicket(data);
    setTickets([...tickets, res.data]);
  };

  const dragEventHandler = (result: DropResult) => {
    const toId = result.destination?.droppableId;
    const ticketId = result.draggableId;
    if (!toId) {
      return;
    }

    const ticket = tickets.find((item) => item.id === ticketId);
    if (!ticket) {
      return;
    }
    const updateTicket = { ...ticket, ...{ status: toId } };
    setTickets(tickets.map((item) => (item.id === ticketId ? updateTicket : item)));
    updateTicketStatus(ticketId, toId);
  };

  const onChangeFilter = (filterData: IFilterData) => {
    fetchSprintTickets(filterData);
  };

  const onChangeSprint = (e: IMinEvent) => {
    setSelectedSprint(getSprintById(e.target.value as string));
  };

  if (loading) {
    return <></>;
  }
  const ticketByStatus = tickets?.groupBy('status') ?? [];

  const sprintsOptions = projectDetails.sprints
    .filter((item) => item.currentSprint)
    .map((item) => {
      return {
        label: item.name,
        value: item.id
      };
    });

  return (
    <ProjectHOC title="Board">
      <div className={styles.mainContainer}>
        {!hasSprint && <p>No Active Sprint</p>}
        {hasSprint && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ maxWidth: '250px', width: '100%' }}>
                <DropdownV2
                  label="Sprint"
                  dataTestId="Sprint"
                  onValueChanged={onChangeSprint}
                  onValueBlur={() => {}}
                  value={selectedSprint.id}
                  name="sprint"
                  options={sprintsOptions}
                />
              </div>
              <ButtonV2
                text="Retro Board"
                fill
                onClick={() => {
                  navigate(`/projects/${projectId}/retro?sprintId=${selectedSprint?.id}`);
                }}
              />
            </div>
            <TicketSearch onChangeFilter={onChangeFilter} />
            <div className={styles.boardMainContainer}>
              <DragDropContext onDragEnd={dragEventHandler}>
                {boardDetails.statuses.map((column) => (
                  <DroppableColumn
                    key={column.id}
                    name={column.name}
                    id={column.id}
                    totalTicket={ticketByStatus[column.id]?.length ?? 0}
                    projectId={projectId}
                    sprintId={selectedSprint.id}
                    createBtn={
                      <CreateBoardTicket
                        onTicketCreate={(data) => {
                          const sprintId = selectedSprint.id;
                          onTicketCreate({
                            title: data.name,
                            status: column.id,
                            type: data.type,
                            project: projectId,
                            sprint: sprintId,
                            dueAt: new Date(),
                            description: ''
                          });
                        }}
                        className={styles.cardAddNewCard}
                      />
                    }
                  >
                    {ticketByStatus[column.id]?.map((item, index) => (
                      <DraggableBoardCard
                        key={item.id}
                        item={item}
                        index={index}
                        projectId={projectId}
                        onTicketUpdated={() => fetchSprintTickets(null)}
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
