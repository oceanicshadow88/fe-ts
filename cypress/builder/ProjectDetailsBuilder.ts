export class ProjectDetailsBuilder {
  private data: any;

  constructor() {
    // Initialize with default values
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
      statues: [
        {
          id: '680ad5c93304169fba2fdaef',
          slug: 'to-do',
          tenant: '680ad3aa3304169fba2fd8fe',
          isDefault: false,
          name: 'to do'
        },
        {
          id: '680ad5c93304169fba2fdaf0',
          slug: 'in-progress',
          tenant: '680ad3aa3304169fba2fd8fe',
          isDefault: false,
          name: 'in progress'
        },
        {
          id: '680ad5c93304169fba2fdaf1',
          slug: 'review',
          tenant: '680ad3aa3304169fba2fd8fe',
          isDefault: false,
          name: 'review'
        },
        {
          id: '680ad5c93304169fba2fdaf2',
          slug: 'done',
          tenant: '680ad3aa3304169fba2fd8fe',
          isDefault: false,
          name: 'done'
        }
      ],
      boards: [
        {
          isPublic: false,
          id: '680ad5c98b96b6e88509d9b8',
          title: 'asd',
          tenant: '680ad3aa3304169fba2fd8fe',
          statuses: [
            {
              id: '680ad5c93304169fba2fdaef',
              slug: 'to-do',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'to do',
              updatedAt: '2025-04-25T00:49:12.137Z'
            },
            {
              id: '680ad5c93304169fba2fdaf0',
              slug: 'in-progress',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'in progress',
              updatedAt: '2025-04-25T00:49:12.137Z'
            },
            {
              id: '680ad5c93304169fba2fdaf1',
              slug: 'review',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'review',
              updatedAt: '2025-04-25T00:49:12.137Z'
            },
            {
              id: '680ad5c93304169fba2fdaf2',
              slug: 'done',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'done',
              updatedAt: '2025-04-25T00:49:12.137Z'
            }
          ],
          createdAt: '2025-04-25T00:22:33.766Z',
          updatedAt: '2025-04-25T00:22:33.766Z'
        },
        {
          id: '680adc088bd91cf9c9fdcb1f',
          title: 'Default',
          tenant: '680ad3aa3304169fba2fd8fe',
          statuses: [
            {
              id: '680ad5c93304169fba2fdaef',
              slug: 'to-do',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'to do',
              updatedAt: '2025-04-25T00:49:12.137Z'
            },
            {
              id: '680ad5c93304169fba2fdaf0',
              slug: 'in-progress',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'in progress',
              updatedAt: '2025-04-25T00:49:12.137Z'
            },
            {
              id: '680ad5c93304169fba2fdaf1',
              slug: 'review',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'review',
              updatedAt: '2025-04-25T00:49:12.137Z'
            },
            {
              id: '680ad5c93304169fba2fdaf2',
              slug: 'done',
              tenant: '680ad3aa3304169fba2fd8fe',
              createdAt: '2025-04-25T00:22:33.633Z',
              isDefault: false,
              name: 'done',
              updatedAt: '2025-04-25T00:49:12.137Z'
            }
          ],
          isPublic: false,
          createdAt: '2025-04-25T00:49:12.165Z',
          updatedAt: '2025-04-25T00:49:12.165Z'
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

  // Method to build the final project object
  build() {
    return this.data;
  }
}
