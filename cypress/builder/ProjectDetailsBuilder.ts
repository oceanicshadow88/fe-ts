import { IStatus, IBoard, ISprint, ITypes } from '../../src/types';
import BaseBuilder from './BaseBuilder';
import StatusBuilder from './StatusBuilder';
import BoardBuilder from './BoardBuilder';
import SprintBuilder from './SprintBuilder';
import TypesBuilder from './TypeBuilder';

export class ProjectDetailsBuilder extends BaseBuilder {
  private readonly data: any = {};
  private readonly tenant: string;

  constructor() {
    // Initialize with default values
    super();

    this.tenant = this.generateId();

    this.data.statuses = ['To Do', 'In Progress', 'In Review', 'Done'].map((name) => {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      return new StatusBuilder().withName(name).withSlug(slug).withTenant(this.tenant).build();
    });

    this.data.boards = ['Default Board 1', 'Default Board 2'].map((title) => {
      return new BoardBuilder()
        .withTitle(title)
        .withTenant(this.tenant)
        .addStatuses(...this.data.statuses)
        .build();
    });

    this.data.ticketTypes = ['Story', 'Task', 'Bug', 'Tech Debt'].map((name, index) => {
      const slug = name.toLowerCase().replace(/\s+/g, '');
      return new TypesBuilder()
        .withName(name)
        .withIcon(`https://some.icon.com/${slug}.png`)
        .withId(this.generateId())
        .build();
    });

    this.data.sprints = ['Sprint 1', 'Sprint 2'].map((name) =>
      new SprintBuilder()
        .withName(name)
        .withCurrentSprint(true)
        .withProjectId(this.data.details?.id || this.generateId())
        .withBoard(this.data.boards[0].id)
        .withRetroBoard(this.data.retroBoards?.[0]?.id || this.generateId())
        .build()
    );

    this.data = {
      labels: [],
      users: [],
      ticketTypes: [
        {
          slug: 'story',
          name: 'Story',
          icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
          createdAt: '2025-04-25T00:22:33.672Z',
          updatedAt: '2025-04-25T00:22:33.672Z',
          id: '680ad5c98b96b6e88509d9a2'
        },
        {
          slug: 'task',
          name: 'Task',
          icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
          createdAt: '2025-04-25T00:22:33.730Z',
          updatedAt: '2025-04-25T00:22:33.730Z',
          id: '680ad5c98b96b6e88509d9ad'
        },
        {
          slug: 'bug',
          name: 'Bug',
          icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
          createdAt: '2025-04-25T00:22:33.757Z',
          updatedAt: '2025-04-25T00:22:33.757Z',
          id: '680ad5c98b96b6e88509d9b5'
        },
        {
          slug: 'techDebt',
          name: 'Tech Debt',
          icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10308?size=medium',
          createdAt: '2025-04-25T00:22:33.788Z',
          updatedAt: '2025-04-25T00:22:33.788Z',
          id: '680ad5c98b96b6e88509d9bf'
        }
      ],
      sprints: [
        {
          id: '680b3c2671dff4ef779f88b2',
          name: 'asdasd',
          startDate: null,
          endDate: null,
          currentSprint: true,
          isComplete: false,
          project: '680b028b34e556689a2fe8bd',
          board: '680adc088bd91cf9c9fdcb1f',
          retroBoard: '680ad5c98b96b6e88509d9d9',
          createdAt: '2025-04-25T07:39:18.289Z',
          updatedAt: '2025-04-25T07:39:29.762Z',
          __v: 0
        },
        {
          id: '680b3d5671dff4ef779f895a',
          name: 'aaa',
          startDate: null,
          endDate: null,
          currentSprint: true,
          isComplete: false,
          project: '680b028b34e556689a2fe8bd',
          board: '680adc088bd91cf9c9fdcb1f',
          retroBoard: '680ad5c98b96b6e88509d9d9',
          createdAt: '2025-04-25T07:44:22.139Z',
          updatedAt: '2025-04-25T07:44:32.237Z',
          __v: 0
        }
      ],
      epics: [],
      details: {
        id: '680b028b34e556689a2fe8bd',
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
      },
      retroBoards: [
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
      ]
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

  // Method to build the final project object
  build() {
    return this.data;
  }
}
