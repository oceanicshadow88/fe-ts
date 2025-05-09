import { IAssign, ILabelData, IProject, ISprint, IStatus, ITicketBasic, ITypes } from '../../src/types';
import BaseBuilder from './BaseBuilder';
import { ProjectBuilder } from './ProjectBuilder';

export class TicketBuilder extends BaseBuilder {
  private readonly data: ITicketBasic;

  constructor() {
    super();
    // Initialize with default values
    const project = new ProjectBuilder().build();

    this.data = {
      id: this.id,
      title: 'Default Ticket',
      priority: 'Medium',
      project: project,
      epic: this.generateId(),
      isActive: true,
    };
  }

  withId(id: string): this {
    this.data.id = id;
    return this;
  }

  withTitle(title: string): this {
    this.data.title = title;
    return this;
  }

  withLabels(labels: ILabelData[]): this {
    this.data.tags = labels;
    return this;
  }

  withComments(comments: string[]): this {
    this.data.comments = comments;
    return this;
  }

  withStatus(status: IStatus): this {
    this.data.status = status;
    return this;
  }

  withPriority(priority: "Medium" | "Highest" | "High" | "Low" | "Lowest"): this {
    this.data.priority = priority;
    return this;
  }

  withProject(project: IProject): this {
    this.data.project = project;
    return this;
  }

  withBoard(board: string): this {
    this.data.board = board;
    return this;
  }
  
  withSprint(sprintId: string): this {
    this.data.sprint = sprintId;
    return this;
  }

  withDescription(description: string): this {
    this.data.description = description;
    return this;
  }

  withStoryPoint(storyPoint: string): this {
    this.data.storyPoint = storyPoint;
    return this;
  }

  withDueAt(dueAt: Date): this {
    this.data.dueAt = dueAt;
    return this;
  }

  withReporter(reporter: string): this {
    this.data.reporter = reporter;
    return this;
  }

  withAssign(assign: IAssign): this {
    this.data.assign = assign;
    return this;
  }

  withType(type: ITypes): this {
    this.data.type = type;
    return this;
  }

  withIsActive(isActive: boolean): this {
    this.data.isActive = isActive;
    return this;
  }

  withAttachmentUrls(attachmentUrls: string[]): this {
    this.data.attachmentUrls = attachmentUrls;
    return this;
  }

  withCreatedAt(createdAt: Date): this {
    this.data.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: Date): this {
    this.data.updatedAt = updatedAt;
    return this;
  }

  withEpic(epic: string): this {
    this.data.epic = epic;
    return this;
  }

  // Method to build the final project object
  build() {
    return this.data;
  }
}
