import { ITicketBasic } from '../../src/types';
import BaseBuilder from './BaseBuilder';

export class TicketBuilder extends BaseBuilder {
  private data: ITicketBasic;

  constructor() {
    super();
    // Initialize with default values
    this.data = {
      title: 'TEC-792-import project from JIRA',
      labels: [],
      comments: [],
      priority: 'Medium',
      project: {
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
      epic: '6809b27f46bf22a0b9cd00e6',
      sprint: null,
      description:
        '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"INCLUDE/PASS TEST"}]},{"type":"paragraph","content":[{"type":"text","text":"Yes"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"URL/PAGE"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"LIMITATION"}]},{"type":"paragraph","content":[{"type":"text","text":"n/a"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"EFFECT/RELATED FUNCTIONS"}]},{"type":"paragraph","content":[{"type":"text","text":"n/a"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"TECHNICAL DETAILS"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"DESCRIPTION"}]},{"type":"paragraph","content":[{"type":"text","text":"*As a …*"}]},{"type":"paragraph","content":[{"type":"text","text":"I want to …"}]},{"type":"paragraph","content":[{"type":"text","text":"So that …"}]},{"type":"paragraph","content":[{"type":"text","text":"*Acceptance Criteria:*"}]},{"type":"paragraph","content":[{"type":"text","text":"AC1:"}]},{"type":"paragraph","content":[{"type":"text","text":"GIVEN …"}]},{"type":"paragraph","content":[{"type":"text","text":"WHEN …"}]},{"type":"paragraph","content":[{"type":"text","text":"THEN …"}]},{"type":"paragraph","content":[{"type":"text","text":"AND …"}]}]}',
      storyPoint: 0,
      dueAt: null,
      assign: null,
      isActive: true,
      attachmentUrls: [],
      createdAt: '2025-04-25T03:33:31.321Z',
      updatedAt: '2025-04-25T03:33:31.321Z',
      id: this.id,
    };
  }

  // Method to build the final project object
  build() {
    return this.data;
  }
}
