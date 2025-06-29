import BaseBuilder from './BaseBuilder';
import { ITypes } from '../../src/types';

export default class TypesBuilder extends BaseBuilder {
  private readonly data: ITypes;

  constructor() {
    super();
    const now = new Date().toISOString();
    this.data = {
      id: this.id,
      name: 'Default Type',
      icon: 'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium',
      createdAt: now,
      updatedAt: now,
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

  withIcon(icon: string): this {
    this.data.icon = icon;
    return this;
  }

  withCreatedAt(date: Date): this {
    this.data.createdAt = date.toISOString();
    return this;
  }

  withUpdatedAt(date: Date): this {
    this.data.updatedAt = date.toISOString();
    return this;
  }

  build(): ITypes {
    return {
      ...this.data
    };
  }
}
