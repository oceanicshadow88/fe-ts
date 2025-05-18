import { IStatus, IBoard, ISprint, ITypes } from '../../src/types';
import BaseBuilder from './BaseBuilder';
import StatusBuilder from './StatusBuilder';
import BoardBuilder from './BoardBuilder';
//TODO: import SprintBuilder from './SprintBuilder';
import TypesBuilder from './TypeBuilder';
//TODO: import EpicBuilder from './EpicBuilder';

export class ProjectDetailsBuilder extends BaseBuilder {
  private readonly data: any = {};
  private readonly tenant: string;

  constructor() {
    // Initialize with default values
    super();

    this.tenant = this.generateId();
    const statuses = ['To Do', 'In Progress', 'In Review', 'Done'].map((name) => {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      return new StatusBuilder().withName(name).withSlug(slug).withTenant(this.tenant).build();
    });

    const boards = ['Default Board 1', 'Default Board 2'].map((title) => {
      return new BoardBuilder()
        .withTitle(title)
        .withTenant(this.tenant)
        .addStatuses(...statuses)
        .build();
    });

    const typeIconMap: Record<string, string> = {
      Story:
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
      Task: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
      Bug: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
      'Tech Debt':
        'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10308?size=medium'
    };

    const ticketTypes = Object.entries(typeIconMap).map(([name, icon]) => {
      return {
        ...new TypesBuilder().withName(name).withIcon(icon).build(),
        slug: name.toLowerCase()
      };
    });

    const details = {
      id: this.generateId(),
      name: 'TECHSCRUM',
      key: 'TEC',
      projectLead: '680ad3aacf31ea12c677cfa4',
      roles: [],
      owner: '680ad3aacf31ea12c677cfa4',
      isDelete: false,
      tenant: '680ad3aa3304169fba2fd8fe',
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
      statues: statuses,
      boards: boards,
      retroBoards: retroBoards
    };
  }

  addStatus(status: IStatus): this {
    this.data.statues.push(status);
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
