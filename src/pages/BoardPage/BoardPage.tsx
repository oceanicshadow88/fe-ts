import React, { useContext, useEffect, useState, useMemo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './BoardPage.module.scss';
import { IProjectDetails, ProjectDetailsContext } from '../../context/ProjectDetailsProvider';
import { getBoardDetails, getSprintTickets } from '../../api/board/board';
import { createNewTicket, updateTicketStatus } from '../../api/ticket/ticket';
import BoardToolbar, { IFilterData } from '../../components/Board/BoardSearch/TicketSearch';
import DropdownV2 from '../../lib/FormV2/DropdownV2/DropdownV2';
import { IBoard, IMinEvent, ISprint, ISprintTicket, IStatus } from '../../types';
import DroppableColumn from './components/DroppableColumn/DroppableColumn';
import DraggableBoardCard from './components/DraggableBoardCard/DraggableBoardCard';
import ProjectHOC from '../../components/HOC/ProjectHOC';
import CreateBoardTicket from './components/CreateBoardTicket/CreateBoardTicket';
import ButtonV2 from '../../lib/FormV2/ButtonV2/ButtonV2';
import { getSprintById } from '../../utils/sprintUtils';
import { generateKeyBetween, customCompare } from '../../utils/lexoRank';

interface IGroupedTickets {
  status: IStatus;
  tickets: ISprintTicket[];
}

export default function BoardPage() {
  const { projectId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectDetails: IProjectDetails = useContext(ProjectDetailsContext);

  const [tickets, setTickets] = useState<ISprintTicket[]>([]);
  const [boardDetails, setBoardDetails] = useState<IBoard>();
  const [selectedSprint, setSelectedSprint] = useState<ISprint | undefined>();

  const hasSprint = selectedSprint && boardDetails;
  const isLoadingProjectDetails = projectDetails.isLoadingDetails;
  const sprintsOptions = useMemo(
    () =>
      projectDetails.sprints
        .filter((item) => item.currentSprint)
        .map((item) => ({
          label: item.name,
          value: item.id
        })),
    [projectDetails]
  );
  const ticketsByStatus = useMemo(() => {
    const res: IGroupedTickets[] =
      boardDetails?.statuses?.map((status: IStatus) => {
        const groupedSortedTickets = tickets
          .filter((ticket: ISprintTicket) => ticket.status === status.id)
          .sort((a, b) => customCompare(a?.rank, b?.rank));
        return { status, tickets: groupedSortedTickets };
      }) ?? [];
    return res;
  }, [tickets, boardDetails]);

  const fetchSprintTickets = async (filterData?: IFilterData) => {
    if (!selectedSprint?.id) return;
    const res = await getSprintTickets(selectedSprint.id, filterData);
    setTickets(res);
  };

  const fetchBoardDetails = async () => {
    if (!selectedSprint?.board) return;
    const res = await getBoardDetails(selectedSprint?.board);
    setBoardDetails(res.data);
  };

  const onTicketCreate = async (newTicket: ISprintTicket) => {
    const allTicketsSorted = tickets.sort((a, b) => customCompare(a?.rank, b?.rank));

    const newRank =
      allTicketsSorted.length > 0
        ? generateKeyBetween(allTicketsSorted[allTicketsSorted.length - 1]?.rank, null)
        : generateKeyBetween(null, null);

    const res = await createNewTicket({ ...newTicket, rank: newRank });
    setTickets([...tickets, res.data]);
  };

  const getNewGlobalRank = (
    destinationIndex: number,
    allTicketsSorted: ISprintTicket[],
    destinationTickets: ISprintTicket[]
  ): string => {
    const lastTicketInColumnIndex = destinationTickets.length - 1;
    const lastTicketGlobalIndex = allTicketsSorted.length - 1;
    if (lastTicketGlobalIndex < 0 || lastTicketInColumnIndex < 0) {
      return generateKeyBetween(null, null);
    }
    const nextTicketInColumn =
      lastTicketInColumnIndex >= destinationIndex
        ? destinationTickets[destinationIndex]
        : undefined;

    let prev: string | null = null;
    let after: string | null = null;
    if (nextTicketInColumn) {
      // find the most nearest ticket that smaller than this nextTicketInColumn
      const nextTicketInColumnGlobalIndex = allTicketsSorted.findIndex(
        (ticket) => ticket.rank === nextTicketInColumn.rank
      );
      if (nextTicketInColumnGlobalIndex) {
        after = nextTicketInColumn.rank ?? null;

        if (nextTicketInColumnGlobalIndex - 1 >= 0) {
          const nearestSmallerRankTicket = allTicketsSorted[nextTicketInColumnGlobalIndex - 1];
          prev = nearestSmallerRankTicket.rank ?? null;
        }
      }
    } else {
      // get the greatest rank
      const greatestRankTicket = allTicketsSorted[lastTicketGlobalIndex];
      prev = greatestRankTicket?.rank ?? null;
    }

    return generateKeyBetween(prev, after);
  };

  const onTicketDrop = async (dropResult: DropResult) => {
    const { destination, source, draggableId: currentTicketId } = dropResult;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const currentTicket = tickets.find((item) => item.id === currentTicketId);
    if (!currentTicket) {
      return;
    }

    const allTicketsSorted = tickets
      .filter((t) => t.id !== currentTicketId)
      .sort((a, b) => customCompare(a?.rank, b?.rank));

    const destinationTicketsSorted = allTicketsSorted.filter(
      (t) => t.status === destination.droppableId
    );

    const newRank = getNewGlobalRank(destination.index, allTicketsSorted, destinationTicketsSorted);

    const updatedTicket = {
      ...currentTicket,
      status: destination.droppableId,
      rank: newRank
    };

    setTickets(tickets.map((item) => (item.id === currentTicketId ? updatedTicket : item)));
    await updateTicketStatus(currentTicketId, destination.droppableId, newRank);
  };

  const onChangeFilter = async (filterData: IFilterData) => {
    await fetchSprintTickets(filterData);
  };

  const onChangeSprint = (e: IMinEvent) => {
    setSelectedSprint(getSprintById(e.target.value as string, projectDetails));
  };

  // 1) initialize selectedSprint
  useEffect(() => {
    if (isLoadingProjectDetails) {
      return;
    }
    const sprintId = searchParams.get('sprintId');
    const currentSprint = sprintId
      ? projectDetails.sprints.find((item) => item.id === sprintId)
      : projectDetails.sprints.find((item) => item.currentSprint);

    if (!currentSprint) {
      return;
    }
    setSelectedSprint(currentSprint);
  }, [isLoadingProjectDetails, searchParams]);

  // 2) initialize board details and board tickets
  useEffect(() => {
    if (!selectedSprint) {
      return;
    }
    (async () => {
      await fetchSprintTickets();
      await fetchBoardDetails();
    })();
  }, [selectedSprint]);

  if (isLoadingProjectDetails) {
    return <></>;
  }

  return (
    <ProjectHOC title="Board">
      <div className={styles.mainContainer}>
        {!hasSprint && <p>No Active Sprint</p>}
        {hasSprint && (
          <>
            <div className={styles.boardHeader}>
              <DropdownV2
                label="Sprint"
                dataTestId="Sprint"
                onValueChanged={onChangeSprint}
                onValueBlur={() => {}}
                value={selectedSprint?.id}
                name="sprint"
                options={sprintsOptions}
                className={styles.dropdown}
              />
              <ButtonV2
                text="Retro Board"
                fill
                onClick={() => {
                  navigate(`/projects/${projectId}/retro?sprintId=${selectedSprint?.id}`);
                }}
              />
            </div>
            <BoardToolbar onChangeFilter={onChangeFilter} />
            <div className={styles.boardMainContainer}>
              <DragDropContext onDragEnd={onTicketDrop}>
                {ticketsByStatus.map(({ status, tickets: groupedSortedTickets }) => (
                  <DroppableColumn
                    key={status.id}
                    name={status.name}
                    id={status.id}
                    totalTicket={ticketsByStatus[status.id]?.length ?? 0}
                    projectId={projectId}
                    sprintId={selectedSprint?.id}
                    createBtn={
                      <CreateBoardTicket
                        onTicketCreate={(data) => {
                          onTicketCreate({
                            title: data.name,
                            status: status.id,
                            type: data.type,
                            projectId,
                            sprintId: selectedSprint.id,
                            dueAt: new Date()
                          });
                        }}
                        className={styles.cardAddNewCard}
                      />
                    }
                  >
                    {groupedSortedTickets?.map((item, index) => (
                      <DraggableBoardCard
                        key={item.id}
                        item={item}
                        index={index}
                        projectId={projectId}
                        onTicketUpdated={() => fetchSprintTickets()}
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
