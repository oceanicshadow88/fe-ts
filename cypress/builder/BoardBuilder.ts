import { IStatusBacklog, IBoard } from '../../src/types';
import BaseBuilder from './BaseBuilder';
import StatusBuilder from './StatusBuilder';

export default class BoardBuilder extends BaseBuilder {
  private readonly data: IBoard;

  constructor() {
    super();
    this.data = {
      id: this.generateId(),
      title: 'Deault Board Name',
      statuses: [
        new StatusBuilder()
          .withName('To Do')
          .withSlug('to-do')
          .withOrder(0)
          .build(),
        new StatusBuilder()
          .withName('In Progress')
          .withSlug('in-progress')
          .withOrder(1)
          .build(),
        new StatusBuilder()
          .withName('In Review')
          .withSlug('in-review')
          .withOrder(2)
          .build(),
        new StatusBuilder()
          .withName('Done')
          .withSlug('done')
          .withOrder(3)
          .build(),
      ],
      isPublic: false,
      tenant: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
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

  addStatuses(...statuses: IStatusBacklog[]): this {
    this.data.statuses.push(...statuses);
    return this;
  }

  withIsPublic(isPublic: boolean): this {
    this.data.isPublic = isPublic;
    return this;
  }

  withTenant(tenant: string): this {
    this.data.tenant = tenant;
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
  // Method to build the final project object
  build() {
    return {
      ...this.data,
    };
  }
}
