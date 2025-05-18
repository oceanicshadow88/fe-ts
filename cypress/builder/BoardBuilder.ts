import { IStatus, IBoard } from '../../src/types';
import BaseBuilder from './BaseBuilder';
import StatusBuilder from './StatusBuilder';

export default class BoardBuilder extends BaseBuilder {
  private readonly data: IBoard;

  constructor() {
    super();
    this.data = {
      id: this.id,
      title: 'Default Board Name',
      statuses: ['To Do', 'In Progress', 'In Review', 'Done'].map((name) => 
        new StatusBuilder()
          .withName(name)
          .withSlug(name.toLowerCase().replace(/\s+/g, '-'))
          .withIsDefault(false)
          .build()
      ),
      isPublic: false,
      tenant: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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

  addStatuses(...statuses: IStatus[]): this {
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

  withCreatedAt(createdAt: string): this {
    this.data.createdAt = createdAt;
    return this;
  }

  withUpdatedAt(updatedAt: string): this {
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
