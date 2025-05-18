import { IStatus, IBoard, ISprint, ITypes } from '../../src/types';
import BaseBuilder from './BaseBuilder';
//TODO: import SprintBuilder from './SprintBuilder';
//TODO: import EpicBuilder from './EpicBuilder';

export class ProjectDetailsBuilder extends BaseBuilder {
  private readonly data: any = {};

  constructor(statuses: IStatus[], boards: IBoard[], ticketTypes: ITypes[], tenant: string) {
    // Initialize with default values
    super();

    const details = {
      id: this.id,
      name: 'TECHSCRUM',
      key: 'TEC',
      projectLead: '680ad3aacf31ea12c677cfa4',
      roles: [],
      owner: '680ad3aacf31ea12c677cfa4',
      isDelete: false,
      tenant: tenant,
      shortcut: [],
      createdAt: '2025-04-25T03:33:31.094Z',
      updatedAt: '2025-04-25T03:33:31.094Z',
      __v: 0
    };

    const retroBoards = [
      {
        id: '680ad5c98b96b6e88509d9d9',
        title: 'Default',
        statuses: [
          {
            id: '680ad5c93304169fba2fdb22',
            slug: 'to-do',
            createdAt: '2025-04-25T00:22:33.882Z',
            description: 'Went well',
            isPublic: true,
            updatedAt: '2025-04-25T00:22:33.882Z'
          },
          {
            id: '680ad5c93304169fba2fdb23',
            slug: 'in-progress',
            createdAt: '2025-04-25T00:22:33.882Z',
            description: 'To Improve',
            isPublic: true,
            updatedAt: '2025-04-25T00:22:33.882Z'
          },
          {
            id: '680ad5c93304169fba2fdb24',
            slug: 'review',
            createdAt: '2025-04-25T00:22:33.882Z',
            description: 'Discuss/Ideas',
            isPublic: true,
            updatedAt: '2025-04-25T00:22:33.882Z'
          }
        ],
        isPublic: true,
        createdAt: '2025-04-25T00:22:33.908Z',
        updatedAt: '2025-04-25T00:22:33.908Z'
      }
    ];

    this.data = {
      labels: [],
      users: [],
      ticketTypes: ticketTypes,
      sprints: [],
      epics: [],
      details: details,
      statuses: statuses,
      boards: boards,
      retroBoards: retroBoards
    };
  }

  addStatus(status: IStatus): this {
    this.data.statuses.push(status);
    return this;
  }

  addBoard(board: IBoard): this {
    this.data.boards.push(board);
    return this;
  }

  addSprint(sprint: ISprint): this {
    this.data.sprints.push(sprint);
    return this;
  }

  addTicketType(type: ITypes): this {
    this.data.ticketTypes.push(type);
    return this;
  }

  addEpic(epic: any): this {
    this.data.epics.push(epic);
    return this;
  }

  // Method to build the final project object
  build() {
    return this.data;
  }
}
