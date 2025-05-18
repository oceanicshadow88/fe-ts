import BaseBuilder from './BaseBuilder';
import BoardBuilder from './BoardBuilder';
import { ISprint } from '../../src/types';

export default class SprintBuilder extends BaseBuilder {
  private readonly data: ISprint & { id: string; createdAt: Date; updatedAt: Date };

  constructor() {
    super();
    const now = new Date();
    const defaultBoard = new BoardBuilder().build();

    this.data = {
      id: this.id,
      name: 'Default Sprint',
      startDate: now,
      endDate: null,
      description: '',
      currentSprint: false,
      isComplete: false,
      projectId: this.generateId(),
      board: defaultBoard.id,
      retroBoard: this.generateId(),
      sprintGoal: '',
      createdAt: now,
      updatedAt: now
    };
  }

  withId(id: string): this {
    this.data.id = id;
    return this;
  }

  withName(name: string): this {
    this.data.name = name;
    return this;
  }

  withStartDate(date: Date): this {
    this.data.startDate = date;
    return this;
  }

  withEndDate(date: Date | null): this {
    this.data.endDate = date;
    return this;
  }

  withDescription(desc: string): this {
    this.data.description = desc;
    return this;
  }

  withCurrentSprint(isCurrent: boolean): this {
    this.data.currentSprint = isCurrent;
    return this;
  }

  withIsComplete(isComplete: boolean): this {
    this.data.isComplete = isComplete;
    return this;
  }

  withProjectId(projectId: string): this {
    this.data.projectId = projectId;
    return this;
  }

  withBoard(boardId: string): this {
    this.data.board = boardId;
    return this;
  }

  withRetroBoard(retroBoardId: string): this {
    this.data.retroBoard = retroBoardId;
    return this;
  }

  withSprintGoal(goal: string): this {
    this.data.sprintGoal = goal;
    return this;
  }

  withCreatedAt(date: Date): this {
    this.data.createdAt = date;
    return this;
  }

  withUpdatedAt(date: Date): this {
    this.data.updatedAt = date;
    return this;
  }

  build(): ISprint & { id: string; createdAt: Date; updatedAt: Date } {
    return {
      ...this.data
    };
  }
}
