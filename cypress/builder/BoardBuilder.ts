export class BoardBuilder {
  private data: any;

  constructor() {
    // Initialize with default values
    this.data = [
      {
        sprint: null,
        title: 'asdasd',
        labels: [],
        comments: [],
        priority: 'Medium',
        project: {
          id: '67e10b1cda089abc827c8499',
          name: 'asdasd',
          key: 'ASD',
          projectLead: '67da9e58d29a0b82bb478c38',
          roles: [
            '67dff2fbe622e6d3c484fd7c',
            '67dff2fbe622e6d3c484fd7d',
            '67dff2fbe622e6d3c484fd7e',
            '67dff2fbe622e6d3c484fd7f'
          ],
          owner: '67da9e58d29a0b82bb478c38',
          iconUrl: '',
          isDelete: false,
          description: 'asdasd',
          websiteUrl: 'asd',
          tenant: '67da9e56747fb7e9714934cd',
          shortcut: [],
          createdAt: '2025-03-24T07:34:52.747Z',
          updatedAt: '2025-03-24T07:34:52.747Z',
          __v: 0
        },
        epic: null,
        sprintId: null,
        description: '',
        storyPoint: 0,
        dueAt: '2025-03-24T07:35:01.838Z',
        reporter: {
          id: '67da9e58d29a0b82bb478c38',
          email: 'kitmanwork@gmail.com',
          name: 'techscrum'
        },
        assign: null,
        type: {
          id: '67c825ccc57e4636f8a522a0',
          slug: 'story',
          name: 'Story',
          icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
          createdAt: '2025-03-05T10:22:04.913Z',
          updatedAt: '2025-03-05T10:22:04.913Z',
          __v: 0
        },
        isActive: true,
        attachmentUrls: [],
        createdAt: '2025-03-24T07:35:01.900Z',
        updatedAt: '2025-03-26T07:11:06.631Z',
        status: '67dfdf95747fb7e97149ca1d',
        id: '67e10b25da089abc827c84d0'
      },
      {
        title: '123',
        labels: [],
        comments: [],
        priority: 'Medium',
        project: {
          id: '67e10b1cda089abc827c8499',
          name: 'asdasd',
          key: 'ASD',
          projectLead: '67da9e58d29a0b82bb478c38',
          roles: [
            '67dff2fbe622e6d3c484fd7c',
            '67dff2fbe622e6d3c484fd7d',
            '67dff2fbe622e6d3c484fd7e',
            '67dff2fbe622e6d3c484fd7f'
          ],
          owner: '67da9e58d29a0b82bb478c38',
          iconUrl: '',
          isDelete: false,
          description: 'asdasd',
          websiteUrl: 'asd',
          tenant: '67da9e56747fb7e9714934cd',
          shortcut: [],
          createdAt: '2025-03-24T07:34:52.747Z',
          updatedAt: '2025-03-24T07:34:52.747Z',
          __v: 0
        },
        epic: null,
        sprint: '67e10b2eda089abc827c84e2',
        description: '',
        storyPoint: 0,
        dueAt: '2025-03-26T23:53:13.524Z',
        reporter: {
          id: '67da9e58d29a0b82bb478c38',
          email: 'kitmanwork@gmail.com',
          name: 'techscrum'
        },
        assign: null,
        type: {
          id: '67c825ccc57e4636f8a522a0',
          slug: 'story',
          name: 'Story',
          icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
          createdAt: '2025-03-05T10:22:04.913Z',
          updatedAt: '2025-03-05T10:22:04.913Z',
          __v: 0
        },
        isActive: true,
        attachmentUrls: [],
        createdAt: '2025-03-26T23:53:13.661Z',
        updatedAt: '2025-03-26T23:53:13.661Z',
        id: '67e493694b368438766db24e'
      }
    ];
  }

  // Method to build the final project object
  build() {
    return this.data;
  }
}
