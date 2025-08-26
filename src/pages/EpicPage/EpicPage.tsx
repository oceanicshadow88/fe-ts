import React, { useContext, useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import UnassignedTickets from '../BacklogPage/components/BacklogSection/BacklogSection';
import { customCompare } from '../../utils/lexoRank';

function EpicPage() {
  const { projectId = '' } = useParams();
  const { showModal, closeModal } = useContext(ModalContext);
  const projectDetails = useContext(ProjectDetailsContext);

  const [tickets, setTickets] = useState<ITicketBasic[]>([]);

  const epicDataFromBackend = projectDetails?.epics ?? [];

  const ticketsWithoutEpic = useMemo(() => {
    const groupBySprint: Record<string, ITicketBasic[]> = tickets?.groupBy('sprint') ?? {};

    Object.keys(groupBySprint).forEach((sprint) => {
      groupBySprint[sprint] = groupBySprint[sprint]
        .filter((ticket) => !ticket.epic)
        .sort((a, b) => customCompare(a?.rank, b?.rank));
    });

    return groupBySprint;
  }, [tickets]);

  const ticketsByEpicId = tickets?.groupBy('epic') ?? {};

  const fetchBacklogData = async (filterData?: IFilterData | null) => {
    try {
      const data = await getBacklogTickets(projectId, filterData);
      setTickets(data);
    } catch (e) {
      toast.error('Temporary Server Error. Try Again.', { theme: 'colored' });
    }
  };

  const onChangeFilter = (data: IFilterData) => {
    fetchBacklogData(data);
  };

  const onIssueCreate = async (data: ITicketInput) => {
    await createNewTicket(data);
    fetchBacklogData();
  };

  const onDragEvent = async (result: DropResult) => {
    const { destination, draggableId } = result;

    const currentTicket = tickets.find((item) => item.id === draggableId);
    if (!currentTicket) {
      return;
    }

    const droppedFailed = destination?.droppableId === currentTicket.epic;
    if (droppedFailed) {
      return;
    }
    const epicId = destination?.droppableId;
    await updateTicketEpic(draggableId, epicId);
    fetchBacklogData(null);
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
          <div className={styles.toolbar}>
            <Button onClick={showCreateModal} dataTestId="epic-create-epic-btn">
              Create epic
            </Button>
          </div>
          <UnassignedTickets
            title="Tickets without epic"
            data-testid="backlog-section"
            totalIssue={Object.values(ticketsWithoutEpic)?.reduce(
              (acc: number, curr: ITicketBasic[]) => acc + curr.length,
              0
            )}
          >
            <DroppableTicketItems
              onTicketChanged={fetchBacklogData}
              data={Object.values(ticketsWithoutEpic).flat()}
              isBacklog
              droppableId="backlog"
            />
          </UnassignedTickets>
        </DragDropContext>
      </div>
    </ProjectHOC>
  );
}

export default EpicPage;
