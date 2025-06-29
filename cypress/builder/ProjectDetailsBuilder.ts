import { IStatus, IBoard, ISprint, ITypes, IRetroBoard } from '../../src/types';
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

    this.data = {
      labels: [],
      users: [],
      ticketTypes: ticketTypes,
      sprints: [],
      epics: [],
      details: details,
      statuses: statuses,
      boards: boards,
      retroBoards: []
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

  addRetroBoard(retroBoard: IRetroBoard): this {
    this.data.retroBoards.push(retroBoard);
    return this;
  }

  // Method to build the final project object
  build() {
    return this.data;
  }
}
