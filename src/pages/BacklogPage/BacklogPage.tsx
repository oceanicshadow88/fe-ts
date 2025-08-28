import React, { useState, useContext, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import BacklogSection from './components/BacklogSection/BacklogSection';
import MoveIncompleteTicketsModal from './components/MoveIncompleteTicketsModal/MoveIncompleteTicketsModal';
import styles from './BacklogPage.module.scss';
import { getBacklogTickets } from '../../api/backlog/backlog';
import SprintSection from './components/SprintSection/SprintSection';
import Loading from '../../components/Loading/Loading';
import ProjectNavigationV3 from '../../lib/ProjectNavigationV3/ProjectNavigationV3';
import CreateEditSprint from './components/CreateEditSprint/CreateEditSprint';
import Button from '../../components/Form/Button/Button';
import { ProjectDetailsContext } from '../../context/ProjectDetailsProvider';
import CreateIssue, { ICreateIssue } from '../../components/Projects/CreateIssue/CreateIssue';
import DroppableTicketItems from '../../components/Projects/DroppableTicketItems/DroppableTicketItems';
import BoardToolbar, { IFilterData } from '../../components/Board/BoardSearch/TicketSearch';
import { ModalContext } from '../../context/ModalProvider';
import { ISprint, ITicketBasic, ITicketInput } from '../../types';
import {
  createNewTicket,
  migrateTicketRanks,
  updateTicketSprint,
  updateTicket
} from '../../api/ticket/ticket';
import ProjectHOC from '../../components/HOC/ProjectHOC';
import checkAccess from '../../utils/helpers';
import { Permission } from '../../utils/permission';
import { customCompare, generateKeyBetween } from '../../utils/lexoRank';

export default function BacklogPage() {
  const { projectId = '' } = useParams();
  const [tickets, setTickets] = useState<ITicketBasic[]>([]);
  const projectDetails = useContext(ProjectDetailsContext);
  const { showModal, closeModal } = useContext(ModalContext);
  const [isMigrating, setIsMigrating] = useState(false);

  const fetchBacklogData = async (filterData?: IFilterData | null) => {
    try {
      const response = await getBacklogTickets(projectId, filterData);
      const ticketsData = response || [];
      const needsMigration = ticketsData.some((ticket) => !ticket.rank);

      if (needsMigration && !isMigrating) {
        setIsMigrating(true);
        try {
          await migrateTicketRanks(projectId);

          const updatedResponse = await getBacklogTickets(projectId, filterData);
          setTickets(updatedResponse || []);
        } catch (error) {
          alert('Migrate Ticket Ranks Failed!');
        } finally {
          setIsMigrating(false);
        }
      } else {
        setTickets(ticketsData);
      }
    } catch (error) {
      setTickets([]);
    }
  };

  const onChangeFilter = (data: IFilterData) => {
    fetchBacklogData(data);
  };

  const getUpdatedStatusId = (
    currentTicket: ITicketBasic,
    source: DraggableLocation,
    destination?: DraggableLocation | null
  ) => {
    const movingToSprint = destination?.droppableId !== 'backlog';
    const movingFromBacklog = source.droppableId === 'backlog';
    if (movingToSprint && movingFromBacklog) {
      return projectDetails?.statuses?.[0]?.id;
    }
    return !movingToSprint ? null : currentTicket?.status;
  };

  const shouldShowAlert = (result: DropResult) => {
    const { destination, source } = result;
    const isTargetBackLog = destination?.droppableId === 'backlog';
    const isSourceBackLog = source.droppableId === 'backlog';
    if (!isTargetBackLog && isSourceBackLog) {
      const targetSprint = projectDetails?.sprints?.find(
        (item) => item.id === destination?.droppableId
      );
      if (targetSprint?.currentSprint) {
        return true;
      }
    }

    if (!isTargetBackLog && !isSourceBackLog) {
      const targetSprint = projectDetails?.sprints?.find(
        (item) => item.id === destination?.droppableId
      );
      const sourceSprint = projectDetails?.sprints?.find((item) => item.id === source?.droppableId);

      if (targetSprint?.currentSprint && !sourceSprint?.currentSprint) {
        return true;
      }
    }
    return false;
  };

  function calculateNewRank(destination, source, draggableId) {
    const sectionTickets =
      destination.droppableId === 'backlog'
        ? tickets.filter((t) => !t.sprint)
        : tickets.filter(
            (t) => t.sprint && String(t.sprint.id ?? t.sprint) === destination.droppableId
          );

    const sortedTickets = [...sectionTickets].sort((a, b) => customCompare(a?.rank, b?.rank));

    const ticketsWithoutCurrent =
      source.droppableId === destination.droppableId
        ? sortedTickets.filter((t) => t.id !== draggableId)
        : sortedTickets;

    if (destination.index === 0) {
      const firstTicket = ticketsWithoutCurrent[0];
      return generateKeyBetween(null, firstTicket?.rank || null);
    }
    if (destination.index >= ticketsWithoutCurrent.length) {
      const lastTicket = ticketsWithoutCurrent[ticketsWithoutCurrent.length - 1];
      return generateKeyBetween(lastTicket?.rank || null, null);
    }
    const prevTicket = ticketsWithoutCurrent[destination.index - 1];
    const nextTicket = ticketsWithoutCurrent[destination.index];
    return generateKeyBetween(prevTicket?.rank || null, nextTicket?.rank || null);
  }

  const onDragEventHandler = async (result: DropResult) => {
    const { destination, draggableId, source } = result;

    if (!destination) {
      return;
    }

    if (shouldShowAlert(result)) {
      alert(
        'Unless it can be finished within this sprint, Please consider move a ticket out of the sprint first, or put the new ticket in next sprint if it cannot be finished'
      );
    }

    const droppedFailed =
      destination.droppableId === source.droppableId && source.index === destination.index;

    if (droppedFailed) return;

    const currentTicket = tickets.find((item) => item.id === draggableId);
    if (!currentTicket) return;

    const sprintId = destination.droppableId === 'backlog' ? null : destination.droppableId;
    const statusId = getUpdatedStatusId(currentTicket, source, destination);

    const newRank = calculateNewRank(destination, source, draggableId);

    const sprintObj = projectDetails?.sprints?.find((s) => s.id === sprintId) || undefined;

    const updatedTicket: ITicketBasic = {
      ...currentTicket,
      rank: newRank,
      sprint: sprintObj,
      status: statusId
    };

    setTickets((prevTickets) =>
      prevTickets.map((ticket) => (ticket.id === draggableId ? updatedTicket : ticket))
    );

    try {
      await updateTicketSprint(draggableId, sprintId, { status: statusId, rank: newRank });
    } catch (error) {
      alert('Failed to update Ticket!');
    }
  };

  const onIssueCreate = async (data: ITicketInput) => {
    if (data.sprintId) {
      const sprint = projectDetails?.sprints?.find((item) => item.id === data.sprintId);
      if (sprint?.currentSprint) {
        alert(
          'Unless it can be finished within this sprint, Please consider move a ticket out of the sprint first, or put it the new ticket in next sprint if it cannot be finished'
        );
      }
    }
    const sectionTickets = data.sprintId
      ? tickets.filter((t) => t.sprint && String(t.sprint.id ?? t.sprint) === data.sprintId)
      : tickets.filter((t) => !t.sprint);

    const sorted = [...sectionTickets].sort((a, b) => customCompare(a?.rank, b?.rank));
    const lastRank = sorted.length > 0 ? sorted[sorted.length - 1].rank : null;
    const newRank = generateKeyBetween(lastRank, null);

    const ticketData = { ...data, rank: newRank };
    await createNewTicket(ticketData);
    fetchBacklogData();
  };

  const calculateShowDropDownTop = () => {
    let totalIncompleteSprint = 0;
    projectDetails?.sprints?.forEach((sprint) => {
      if (!sprint.isComplete) {
        totalIncompleteSprint += 1;
      }
    });
    if (totalIncompleteSprint > 3) {
      return true;
    }
    const totalTicket = 0;

    return totalTicket > 7;
  };

  const showCreateModal = () => {
    showModal(
      'create-sprint',
      <CreateEditSprint
        type="Create"
        projectId={projectId}
        projectDetails={projectDetails}
        onClickCloseModal={() => {
          closeModal('create-sprint');
        }}
      />
    );
  };

  const sprintData = projectDetails?.sprints ?? [];

  const getNormalizedSprintId = (sprint: string | ISprint | null | undefined): string => {
    if (!sprint) return 'backlog';
    if (typeof sprint === 'string') return sprint;
    return sprint.id;
  };

  const ticketsBySprintId = useMemo(() => {
    const grouped: Record<string, ITicketBasic[]> = { backlog: [] };

    tickets?.forEach((ticket) => {
      const sprintId = getNormalizedSprintId(ticket.sprint);

      if (!grouped[sprintId]) {
        grouped[sprintId] = [];
      }

      grouped[sprintId].push(ticket);
    });

    Object.keys(grouped).forEach((key) => {
      grouped[key] = grouped[key].sort((a, b) => customCompare(a?.rank, b?.rank));
    });

    return grouped;
  }, [tickets]);

  const onSprintComplete = useCallback(
    async (sprintId: string) => {
      const sprintTickets = ticketsBySprintId[sprintId];
      const statusDone = projectDetails.statuses.find((s) => s.slug === 'done');
      const incompleteTickets = sprintTickets.filter((ticket) => ticket.status !== statusDone?.id);
      const incompleteSprints = projectDetails.sprints.filter(
        (sprint) => !sprint.isComplete && sprint.id !== sprintId
      );

      const onClickConfirmModal = async (target: 'sprint' | 'backlog') => {
        const closestSprint = incompleteSprints[0];
        await Promise.all(
          incompleteTickets.map((ticket) =>
            updateTicket(ticket.id, {
              sprint: target === 'sprint' ? closestSprint.id : null,
              status: target === 'sprint' ? ticket.status : null
            })
          )
        );

        closeModal('move-incomplete-tickets');
        await fetchBacklogData();
      };

      const showMoveIncompleteTicketsModal = async () =>
        new Promise<'sprint' | 'backlog' | null>((resolve) => {
          showModal(
            'move-incomplete-tickets',
            <MoveIncompleteTicketsModal
              onConfirm={async (target: 'sprint' | 'backlog') => {
                await onClickConfirmModal(target);
                resolve(target);
              }}
              onClickCloseModal={() => {
                closeModal('move-incomplete-tickets');
                resolve(null);
              }}
            />
          );
        });

      const hasIncompleteTickets = incompleteTickets.length > 0;
      const hasNextSprint = incompleteSprints.length > 0;

      if (hasIncompleteTickets && hasNextSprint) {
        const result = await showMoveIncompleteTicketsModal();
        if (!result) return false;
      } else if (hasIncompleteTickets) {
        await onClickConfirmModal('backlog');
      }
      return true;
    },
    [ticketsBySprintId, projectDetails, showModal, closeModal, fetchBacklogData]
  );

  if (projectDetails.isLoadingDetails) {
    return (
      <div className="container">
        <h1 className="text-2xl font-bold" data-testid="backlog-header">
          Backlog
        </h1>
        <ProjectNavigationV3 />
        <Loading />
      </div>
    );
  }

  return (
    <ProjectHOC title="Backlog">
      <div className={styles.scrollContainer}>
        <BoardToolbar onChangeFilter={onChangeFilter} />
        <DragDropContext
          onDragEnd={(result) => {
            onDragEventHandler(result);
          }}
        >
          {sprintData
            .filter((sprint) => {
              return !sprint.isComplete;
            })
            .map((sprint) => {
              return (
                <SprintSection
                  key={sprint.id}
                  sprint={sprint}
                  totalIssue={ticketsBySprintId[sprint.id]?.length ?? 0}
                  onSprintComplete={onSprintComplete}
                  dataTestId={`sprint-${sprint.id}`}
                >
                  <DroppableTicketItems
                    onTicketChanged={fetchBacklogData}
                    data={ticketsBySprintId[sprint.id]}
                    droppableId={sprint.id}
                  />
                  <CreateIssue
                    onIssueCreate={(data: ICreateIssue) =>
                      onIssueCreate({
                        title: data.name,
                        type: data.type,
                        projectId,
                        sprintId: sprint.id,
                        dueAt: new Date(),
                        description: ''
                      })
                    }
                  />
                </SprintSection>
              );
            })}
          <div className={styles.toolbar}>
            {checkAccess(Permission.CreateSprints, projectId) && (
              <Button onClick={showCreateModal} dataTestId="backlog-create-sprint-btn">
                Create sprint
              </Button>
            )}
          </div>
          <BacklogSection
            data-testid="backlog-section"
            totalIssue={ticketsBySprintId?.backlog?.length ?? 0}
          >
            <DroppableTicketItems
              onTicketChanged={fetchBacklogData}
              data={ticketsBySprintId.backlog}
              isBacklog
              droppableId="backlog"
            />
            <CreateIssue
              onIssueCreate={(data: ICreateIssue) =>
                onIssueCreate({
                  title: data.name,
                  type: data.type,
                  projectId,
                  sprintId: null,
                  dueAt: new Date(),
                  description: ''
                })
              }
              showDropDownOnTop={calculateShowDropDownTop()}
            />
          </BacklogSection>
        </DragDropContext>
        {Object.values(ticketsBySprintId).flat().length === 0 && (
          <div className={styles.emptyWrapper}>
            <div data-testid="empty-ticket-result" className="empty-state">
              There is nothing that matches this filter.
            </div>
          </div>
        )}
      </div>
    </ProjectHOC>
  );
}
