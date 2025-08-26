import React, { useContext, useState, useMemo } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBacklogTickets } from '../../api/backlog/backlog';
import { createNewTicket, updateTicketEpic, migrateTicketRanks } from '../../api/ticket/ticket';
import TicketSearch, { IFilterData } from '../../components/Board/BoardSearch/TicketSearch';
import Button from '../../components/Form/Button/Button';
import ProjectHOC from '../../components/HOC/ProjectHOC';
import ProjectSectionHOC from '../../components/HOC/ProjectSectionHOC/ProjectSectionHOC';
import CreateIssue, { ICreateIssue } from '../../components/Projects/CreateIssue/CreateIssue';
import DroppableTicketItems from '../../components/Projects/DroppableTicketItems/DroppableTicketItems';
import { ModalContext } from '../../context/ModalProvider';
import { ProjectDetailsContext } from '../../context/ProjectDetailsProvider';
import { ITicketBasic, ITicketInput } from '../../types';
import CreateEditEpic from './components/CreateEditEpic/CreateEditEpic';
import styles from './EpicPage.module.scss';
import { customCompare, generateRankBetweenTwoTickets } from '../../utils/lexoRank';

function EpicPage() {
  const { projectId = '' } = useParams();
  const [tickets, setTickets] = useState<ITicketBasic[]>([]);
  const { showModal, closeModal } = useContext(ModalContext);
  const projectDetails = useContext(ProjectDetailsContext);
  const [isMigrating, setIsMigrating] = useState(false);

  const fetchBacklogData = async (filterData?: IFilterData | null) => {
    try {
      const response = await getBacklogTickets(projectId, filterData);
      const ticketsData = response || [];
      const needsMigration = ticketsData.some((ticket) => !ticket.rank);

      if (!needsMigration || isMigrating) {
        setTickets(ticketsData);
        return;
      }

      setIsMigrating(true);
      try {
        await migrateTicketRanks(projectId);
        const updatedResponse = await getBacklogTickets(projectId, filterData);
        setTickets(updatedResponse || []);
      } catch (error) {
        toast.error('Migrate Ticket Ranks Failed!');
      } finally {
        setIsMigrating(false);
      }
    } catch (e) {
      setTickets([]);
    }
  };

  const onChangeFilter = (data: IFilterData) => {
    fetchBacklogData(data);
  };

  const calculateRankAfterDrag = (destination, source, draggableId) => {
    const sortedTickets = [...tickets]
      .filter((t) => t.id !== draggableId)
      .sort((a, b) => customCompare(a?.rank, b?.rank));

    const destinationTickets = sortedTickets.filter((t) => {
      return t.epic === destination.droppableId;
    });

    const noTicketsInColumn = destinationTickets.length === 0;
    if (noTicketsInColumn) {
      const lastGlobalTicket = sortedTickets[sortedTickets.length - 1];
      const newRank = generateRankBetweenTwoTickets(lastGlobalTicket?.rank || null, null);
      return newRank;
    }

    const isDraggedToTop = destination.index === 0;
    if (isDraggedToTop) {
      const firstTicket = destinationTickets[0];
      const firstTicketGlobalIndex = sortedTickets.findIndex((t) => t.id === firstTicket.id);
      const prevTicket =
        firstTicketGlobalIndex > 0 ? sortedTickets[firstTicketGlobalIndex - 1] : null;
      const newRank = generateRankBetweenTwoTickets(
        prevTicket?.rank || null,
        firstTicket?.rank || null
      );
      return newRank;
    }

    const isDraggedToBottom = destination.index >= destinationTickets.length;
    if (isDraggedToBottom) {
      const lastTicket = destinationTickets[destinationTickets.length - 1];
      const lastTicketGlobalIndex = sortedTickets.findIndex((t) => t.id === lastTicket.id);
      const nextTicket =
        lastTicketGlobalIndex < sortedTickets.length - 1
          ? sortedTickets[lastTicketGlobalIndex + 1]
          : null;
      const newRank = generateRankBetweenTwoTickets(
        lastTicket?.rank || null,
        nextTicket?.rank || null
      );
      return newRank;
    }

    const prevTicket = destinationTickets[destination.index - 1];
    const nextTicket = destinationTickets[destination.index];
    const newRank = generateRankBetweenTwoTickets(
      prevTicket?.rank || null,
      nextTicket?.rank || null
    );
    return newRank;
  };

  const onDragEventHandler = async (result: DropResult) => {
    const { destination, draggableId, source } = result;

    if (!destination) {
      return;
    }

    const currentTicket = tickets.find((item) => item.id === draggableId);
    if (!currentTicket) {
      return;
    }

    const droppedFailed =
      destination.droppableId === source.droppableId && destination.index === source.index;
    if (droppedFailed) {
      return;
    }

    const noEpic = 'no-epic';
    const epicId = destination.droppableId === noEpic ? noEpic : destination.droppableId;
    const newRank = calculateRankAfterDrag(destination, source, draggableId);

    const updatedTicket = {
      ...currentTicket,
      epic: epicId,
      rank: newRank
    };

    setTickets((prevTickets) =>
      prevTickets.map((ticket) => (ticket.id === draggableId ? updatedTicket : ticket))
    );

    try {
      await updateTicketEpic(draggableId, epicId, newRank);
    } catch (error) {
      toast.error('Failed to update Ticket!');
      fetchBacklogData(null);
    }
  };

  const onIssueCreate = async (data: ITicketInput) => {
    const sorted = [...tickets].sort((a, b) => customCompare(a?.rank, b?.rank));
    const lastRank = sorted.length > 0 ? sorted[sorted.length - 1].rank : null;
    const newRank = generateRankBetweenTwoTickets(lastRank, null);

    const ticketData = { ...data, rank: newRank };

    await createNewTicket(ticketData);
    fetchBacklogData();
  };

  const showCreateModal = () => {
    showModal(
      'create-epic',
      <CreateEditEpic
        type="Create"
        projectId={projectId}
        projectDetails={projectDetails}
        onClickCloseModal={() => {
          closeModal('create-epic');
        }}
      />
    );
  };

  const epicDataFromBackend = projectDetails?.epics ?? [];

  const ticketsByEpicId = useMemo(() => {
    const noEpic = 'no-epic';
    const grouped: Record<string, ITicketBasic[]> = { noEpic: [] };

    tickets?.forEach((ticket) => {
      const epicId =
        typeof ticket.epic === 'object' && ticket.epic !== null
          ? (ticket.epic as { id: string }).id
          : ticket.epic;
      const key = epicId || noEpic;

      if (!grouped[key]) {
        grouped[key] = [];
      }

      grouped[key].push(ticket);
    });

    Object.keys(grouped).forEach((key) => {
      grouped[key] = grouped[key].sort((a, b) => customCompare(a?.rank, b?.rank));
    });

    return grouped;
  }, [tickets]);

  return (
    <ProjectHOC title="Epic">
      <div className={styles.scrollContainer}>
        <TicketSearch onChangeFilter={onChangeFilter} />
        <div className={styles.toolbar}>
          <Button onClick={showCreateModal} dataTestId="epic-create-epic-btn">
            Create epic
          </Button>
        </div>
        <DragDropContext
          onDragEnd={(result) => {
            onDragEventHandler(result);
          }}
        >
          {epicDataFromBackend
            .filter((epic) => {
              return !epic.isComplete;
            })
            .map((epic) => {
              return (
                <ProjectSectionHOC
                  key={epic.id}
                  title={epic.title}
                  startDate={epic.startDate}
                  endDate={epic.dueAt}
                  epic={epic}
                  totalIssue={ticketsByEpicId[epic.id]?.length ?? 0}
                  dataTestId={`epic-${epic.id}`}
                >
                  <DroppableTicketItems
                    onTicketChanged={fetchBacklogData}
                    data={ticketsByEpicId[epic.id]}
                    droppableId={epic.id}
                  />
                  <CreateIssue
                    onIssueCreate={(data: ICreateIssue) =>
                      onIssueCreate({
                        title: data.name,
                        type: data.type,
                        projectId,
                        epicId: epic.id,
                        dueAt: new Date(),
                        description: ''
                      })
                    }
                  />
                </ProjectSectionHOC>
              );
            })}
        </DragDropContext>
      </div>
    </ProjectHOC>
  );
}

export default EpicPage;
