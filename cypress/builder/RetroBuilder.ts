import BaseBuilder from './BaseBuilder';
import { IRetroBoard, IRetroStatus, IRetroItem } from '../../src/types';

class RetroBoardBuilder extends BaseBuilder {
  private readonly data: IRetroBoard;

  constructor() {
    super();
    
    const now = new Date();
  
    this.data = {
      id: this.id,
      title: 'Default Retro Board',
      statuses: [],
      isPublic: false,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
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

  withTenant(tenant: string): this {
    this.data.tenant = tenant;
    return this;
  }

  withStatuses(statuses: IRetroStatus[]): this {
    this.data.statuses = statuses;
    return this;
  }

  withIsPublic(isPublic: boolean): this {
    this.data.isPublic = isPublic;
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

  build() {
    return {
      ...this.data
    } as IRetroBoard;
  }
}

class RetroStatusBuilder extends BaseBuilder {
  private readonly data: IRetroStatus;

  constructor() {
    super();
    
    const now = new Date();
  
    this.data = {
      id: this.id,
      description: 'Default status description',
      slug: 'default-status',
      isPublic: false,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  }

  withId(id: string): this {
    this.data.id = id;
    return this;
  }

  withDescription(description: string): this {
    this.data.description = description;
    return this;
  }

  withSlug(slug: string): this {
    this.data.slug = slug;
    return this;
  }

  withTenant(tenant: string): this {
    this.data.tenant = tenant;
    return this;
  }

  withIsPublic(isPublic: boolean): this {
    this.data.isPublic = isPublic;
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

  build() {
    return {
      ...this.data
    } as IRetroStatus;
  }
}

class RetroItemBuilder extends BaseBuilder {
  private readonly data: IRetroItem;

  constructor() {
    super();
    
    const now = new Date();
  
    this.data = {
      id: this.id,
      content: 'Default retro item content',
      tenant: this.generateId(),
      sprint: this.generateId(),
      status: this.generateId(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  }

  withId(id: string): this {
    this.data.id = id;
    return this;
  }

  withContent(content: string): this {
    this.data.content = content;
    return this;
  }

  withOrder(order: number): this {
    this.data.order = order;  
    return this;
  }

  withTenant(tenant: string): this {
    this.data.tenant = tenant;
    return this;
  }

  withSprint(sprintId: string): this {
    this.data.sprint = sprintId;
    return this;
  }

  withStatus(statusId: string): this {
    this.data.status = statusId;
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

  build() {
    return {
      ...this.data
    } as IRetroItem;
  }
}

export { RetroBoardBuilder, RetroStatusBuilder, RetroItemBuilder };
