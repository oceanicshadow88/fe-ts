/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import BacklogSection from './components/BacklogSection/BacklogSection';
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
import TicketTitleSearch, {
  IFilterData
} from '../../components/Board/BoardSearch/TicketTitleSearch';
import { ModalContext } from '../../context/ModalProvider';
import { ITicketBasic, ITicketInput } from '../../types';
import { createNewTicket, updateTicketSprint } from '../../api/ticket/ticket';
import ProjectHOC from '../../components/HOC/ProjectHOC';
import checkAccess from '../../utils/helpers';
import { Permission } from '../../utils/permission';

export default function BacklogPage() {
  const { projectId = '' } = useParams();
  const [tickets, setTickets] = useState<ITicketBasic[]>([]);
  const projectDetails = useContext(ProjectDetailsContext);
  const { showModal, closeModal } = useContext(ModalContext);

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

  const getStatusId = (currentTicket: ITicketBasic, destination?: DraggableLocation | null) => {
    const movingToSprint = destination?.droppableId !== 'backlog';
    const hasStatus = currentTicket.status;
    if (movingToSprint && !hasStatus) {
      return projectDetails.statuses[0].id;
    }
    return !movingToSprint ? null : currentTicket?.status?.id;
  };

  const shouldShowAlert = (result: DropResult) => {
    const { destination, source } = result;
    const isTargetBackLog = destination?.droppableId === 'backlog';
    const isSourceBackLog = source.droppableId === 'backlog';
    if (!isTargetBackLog && isSourceBackLog) {
      const targetSprint = projectDetails.sprints.find(
        (item) => item.id === destination?.droppableId
      );
      if (targetSprint?.currentSprint) {
        return true;
      }
    }

    if (!isTargetBackLog && !isSourceBackLog) {
      const targetSprint = projectDetails.sprints.find(
        (item) => item.id === destination?.droppableId
      );
      const sourceSprint = projectDetails.sprints.find((item) => item.id === source?.droppableId);

      if (targetSprint?.currentSprint && !sourceSprint?.currentSprint) {
        return true;
      }
    }
    return false;
  };

  const onDragEventHandler = async (result: DropResult) => {
    const { destination, draggableId } = result;

    if (shouldShowAlert(result)) {
      alert(
        'Unless it can be finished within this sprint, Please consider move a ticket out of the sprint first, or put it the new ticket in next sprint if it cannot be finished'
      );
    }

    const currentTicket = tickets.find((item) => item.id === draggableId);
    if (!currentTicket) {
      return;
    }
    const droppedFailed = destination?.droppableId === currentTicket.sprint?.id;
    if (droppedFailed) {
      return;
    }

    const sprintId = destination?.droppableId === 'backlog' ? null : destination?.droppableId;
    const statusId = getStatusId(currentTicket, destination);

    await updateTicketSprint(draggableId, sprintId, { status: statusId });
    fetchBacklogData(null);
  };

  const onIssueCreate = async (data: ITicketInput) => {
    if (data.sprintId) {
      const sprint = projectDetails.sprints.find((item) => item.id === data.sprintId);
      if (sprint?.currentSprint) {
        alert(
          'Unless it can be finished within this sprint, Please consider move a ticket out of the sprint first, or put it the new ticket in next sprint if it cannot be finished'
        );
      }
    }
    await createNewTicket(data);
    fetchBacklogData();
  };

  const calculateShowDropDownTop = () => {
    let totalIncompleteSprint = 0;
    projectDetails.sprints.forEach((sprint) => {
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
  const ticketsBySprintId = tickets?.groupBy('sprint', 'backlog') ?? {};
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
        <TicketTitleSearch onChangeFilter={onChangeFilter} />
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
              <Button onClick={showCreateModal}>Create sprint</Button>
            )}
          </div>
          <BacklogSection totalIssue={ticketsBySprintId?.backlog?.length ?? 0}>
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
      </div>
    </ProjectHOC>
  );
}
