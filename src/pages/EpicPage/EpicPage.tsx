import React, { useContext, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { getBacklogTickets } from '../../api/backlog/backlog';
import { createNewTicket, updateTicketEpic } from '../../api/ticket/ticket';
import BoardToolbar, { IFilterData } from '../../components/Board/BoardSearch/TicketSearch';
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
import UnassignedTicketsSection from '../BacklogPage/components/BacklogSection/BacklogSection';
import { customCompare, generateKeyBetween } from '../../utils/lexoRank';
import { getNewGlobalRank } from '../../utils/reorderUtils';

function EpicPage() {
  const { projectId = '' } = useParams();
  const { showModal, closeModal } = useContext(ModalContext);
  const projectDetails = useContext(ProjectDetailsContext);
  const epicDataFromBackend = projectDetails?.epics ?? [];

  const [tickets, setTickets] = useState<ITicketBasic[]>([]);

  const ticketsByEpicId = tickets?.groupBy('epic') ?? {};
  const ticketsWithoutEpic = tickets
    .filter((t) => !t.epic)
    ?.sort((a, b) => customCompare(a?.rank, b?.rank));

  const fetchBacklogData = async (filterData?: IFilterData | null) => {
    const data = await getBacklogTickets(projectId, filterData);
    setTickets(data);
  };

  const onChangeFilter = async (data: IFilterData) => {
    await fetchBacklogData(data);
  };

  const onIssueCreate = async (newTicket: ITicketInput) => {
    const allTicketsSorted = tickets.sort((a, b) => customCompare(a?.rank, b?.rank));

    const newRank =
      allTicketsSorted.length > 0
        ? generateKeyBetween(allTicketsSorted[allTicketsSorted.length - 1]?.rank, null)
        : generateKeyBetween(null, null);

    const res = await createNewTicket({ ...newTicket, rank: newRank });
    setTickets([...tickets, res.data]);
  };

  const onDragEvent = async (dropResult: DropResult) => {
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

    const destinationTicketsSorted = allTicketsSorted.filter((t) =>
      t.epic !== null
        ? t.epic === destination.droppableId
        : destination.droppableId === 'unassigned'
    );
    const newRank = getNewGlobalRank(destination.index, allTicketsSorted, destinationTicketsSorted);
    const epicId = destination?.droppableId === 'unassigned' ? null : destination?.droppableId;
    const updatedTicket = {
      ...currentTicket,
      epic: epicId,
      rank: newRank
    };

    setTickets(tickets.map((item) => (item.id === currentTicketId ? updatedTicket : item)));
    await updateTicketEpic(currentTicketId, epicId, newRank);
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

  return (
    <ProjectHOC title="Epic">
      <div className={styles.scrollContainer}>
        <BoardToolbar onChangeFilter={onChangeFilter} />
        <DragDropContext
          onDragEnd={(result) => {
            onDragEvent(result);
          }}
        >
          {epicDataFromBackend
            .filter((epic) => {
              return !epic.isComplete;
            })
            ?.map((epic) => {
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
                    data={ticketsByEpicId[epic.id]?.sort((a, b) => customCompare(a?.rank, b?.rank))}
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
          <div className={styles.toolbar}>
            <Button onClick={showCreateModal} dataTestId="epic-create-epic-btn">
              Create epic
            </Button>
          </div>
          <UnassignedTicketsSection
            title="Tickets without epic"
            data-testid="backlog-section"
            totalIssue={ticketsWithoutEpic?.length ?? 0}
          >
            <DroppableTicketItems
              onTicketChanged={fetchBacklogData}
              data={ticketsWithoutEpic}
              isBacklog
              droppableId="unassigned"
            />
          </UnassignedTicketsSection>
        </DragDropContext>
      </div>
    </ProjectHOC>
  );
}

export default EpicPage;
