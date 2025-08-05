import React, { useContext, useEffect, useState, useMemo } from 'react';
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
import { getSprintById } from '../../utils/sprintUtils';
import { generateRankBetweenTwoTickets, customCompare } from '../../utils/lexoRank';

export default function BoardPage() {
  const [tickets, setTickets] = useState<ITicketBoard[]>([]);
  const [boardDetails, setBoardDetails] = useState<IBoard>();
  const [selectedSprint, setSelectedSprint] = useState<any>('');
  const projectDetails = useContext(ProjectDetailsContext);
  const { projectId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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

  const ticketsByStatus = useMemo(() => {
    const grouped: Record<string, ITicketBoard[]> = {};

    boardDetails?.statuses.forEach((status) => {
      grouped[status.id] = [];
    });

    tickets.forEach((ticket) => {
      if (ticket.status && grouped[ticket.status]) {
        grouped[ticket.status].push(ticket);
      }
    });

    Object.keys(grouped).forEach((statusId) => {
      grouped[statusId] = grouped[statusId].sort((a, b) => customCompare(a?.rank, b?.rank));
    });

    return grouped;
  }, [tickets, boardDetails]);

  if (projectDetails.isLoadingDetails) {
    return <></>;
  }
  const hasSprint = projectDetails.sprints.map((item) => item.currentSprint) && boardDetails;
  const loading = projectDetails.isLoadingDetails;

  const onTicketCreate = async (data) => {
    const allTicketsSorted = tickets.sort((a, b) => customCompare(a?.rank, b?.rank));

    const newRank =
      allTicketsSorted.length > 0
        ? generateRankBetweenTwoTickets(allTicketsSorted[allTicketsSorted.length - 1]?.rank, null)
        : generateRankBetweenTwoTickets(null, null);

    const ticketData = { ...data, rank: newRank };

    const res = await createNewTicket(ticketData);
    setTickets([...tickets, res.data]);
  };

  const getGlobalTicketRank = (
    destinationIndex: number,
    allTicketsSorted: ITicketBoard[],
    destinationTickets: ITicketBoard[]
  ) => {
    const isDraggedToTop = destinationIndex === 0;
    const isDraggedToBottom = destinationIndex >= destinationTickets.length;

    if (isDraggedToTop) {
      const [topTicket] = destinationTickets;
      if (topTicket) {
        const globalIndex = allTicketsSorted.findIndex((t) => t.id === topTicket.id);
        const prevTicket = globalIndex > 0 ? allTicketsSorted[globalIndex - 1] : undefined;
        return { prevRank: prevTicket?.rank || null, nextRank: topTicket.rank };
      }
    } else if (isDraggedToBottom) {
      const lastTicket = destinationTickets[destinationTickets.length - 1];
      if (lastTicket) {
        const globalIndex = allTicketsSorted.findIndex((t) => t.id === lastTicket.id);
        const nextTicket =
          globalIndex < allTicketsSorted.length - 1 ? allTicketsSorted[globalIndex + 1] : undefined;
        return { prevRank: lastTicket.rank, nextRank: nextTicket?.rank || null };
      }
    }
    const prevTicket = destinationTickets[destinationIndex - 1];
    const prevGlobalIndex = allTicketsSorted.findIndex((t) => t.id === prevTicket.id);

    const nextTicket = allTicketsSorted[prevGlobalIndex + 1];
    return { prevRank: prevTicket?.rank, nextRank: nextTicket?.rank };
  };

  const dragEventHandler = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const ticketId = draggableId;
    const ticket = tickets.find((item) => item.id === ticketId);
    if (!ticket) {
      return;
    }

    const allTicketsSorted = tickets
      .filter((t) => t.id !== ticketId)
      .sort((a, b) => customCompare(a?.rank, b?.rank));

    const destinationTickets = allTicketsSorted.filter((t) => t.status === destination.droppableId);

    let newRank: string | undefined;
    let needsRankUpdate = false;

    if (destinationTickets.length !== 0) {
      const { prevRank, nextRank } = getGlobalTicketRank(
        destination.index,
        allTicketsSorted,
        destinationTickets
      );

      const dragToSameColumn = destination.droppableId === source.droppableId;
      if (dragToSameColumn) {
        needsRankUpdate = true;
        newRank = generateRankBetweenTwoTickets(prevRank, nextRank);
      } else {
        const currentRank = ticket.rank || '';
        const rankOrderFitsCorrectly =
          (prevRank === null || customCompare(prevRank, currentRank) < 0) &&
          (nextRank === null || customCompare(currentRank, nextRank) < 0);

        if (rankOrderFitsCorrectly) {
          needsRankUpdate = false;
        } else {
          needsRankUpdate = true;
          newRank = generateRankBetweenTwoTickets(prevRank, nextRank);
        }
      }
    }

    const updatedTicket = {
      ...ticket,
      status: destination.droppableId,
      ...(needsRankUpdate && newRank ? { rank: newRank } : {})
    };

    setTickets(tickets.map((item) => (item.id === ticketId ? updatedTicket : item)));

    try {
      if (needsRankUpdate && newRank) {
        await updateTicketStatus(ticketId, destination.droppableId, newRank);
      } else {
        await updateTicketStatus(ticketId, destination.droppableId);
      }
    } catch (error) {
      fetchSprintTickets(null);
    }
  };

  const onChangeFilter = (filterData: IFilterData) => {
    fetchSprintTickets(filterData);
  };

  const onChangeSprint = (e: IMinEvent) => {
    setSelectedSprint(getSprintById(e.target.value as string, projectDetails));
  };

  if (loading) {
    return <></>;
  }

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
                    totalTicket={ticketsByStatus[column.id]?.length ?? 0}
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
                            sprintId,
                            dueAt: new Date(),
                            description: ''
                          });
                        }}
                        className={styles.cardAddNewCard}
                      />
                    }
                  >
                    {ticketsByStatus[column.id]?.map((item, index) => (
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
