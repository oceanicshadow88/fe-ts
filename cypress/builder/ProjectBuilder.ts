import { IProject, IUserInfo, IRole } from '../../src/types'; // Adjust the import path as needed
import BaseBuilder from './BaseBuilder';

export class ProjectBuilder extends BaseBuilder {
  private readonly data: IProject;

  constructor() {
    // Initialize with default values
    super();
    this.data = {
      id: this.id,
      name: 'Default Project',
      iconUrl: 'https://example.com/default-icon.png',
      type: 'scrum',
      board: 'default-board',
      projectLead: {
        id: 'default-lead-id',
        name: 'Default Lead',
        email: 'lead@example.com'
      },
      updateAt: new Date(),
      roles: [],
      owner: {
        id: 'default-owner-id',
        name: 'Default Owner',
        email: 'lead@example.com'
      },
      defaultRetroBoard: 'default-retro-board',
      shortcut: [
        {
          name: 'asdad',
          shortcutLink: 'http://www.google.com',
          id: '67dbea2eadf28106689498b9'
        }
      ]
    };
  }

  // Builder methods for each property
  withId(id: string): this {
    this.data.id = id;
    return this;
  }

  withName(name: string): this {
    this.data.name = name;
    return this;
  }

  withIconUrl(iconUrl: string): this {
    this.data.iconUrl = iconUrl;
    return this;
  }

  withType(type: string): this {
    this.data.type = type;
    return this;
  }

  withBoard(board: string): this {
    this.data.board = board;
    return this;
  }

  withProjectLead(projectLead: IUserInfo): this {
    this.data.projectLead = projectLead;
    return this;
  }

  withUpdateAt(updateAt: Date): this {
    this.data.updateAt = updateAt;
    return this;
  }

  withRoles(roles: IRole[]): this {
    this.data.roles = roles;
    return this;
  }

  withDefaultRetroBoard(defaultRetroBoard: string): this {
    this.data.defaultRetroBoard = defaultRetroBoard;
    return this;
  }

  withShortcut(shortcut: any): this {
    this.data.shortcut = shortcut;
    return this;
  }

  withOwner(owner: IUserInfo): this {
    this.data.owner = owner;
    return this;
  }

  // Add a role to the existing roles array
  addRole(role: IRole): this {
    this.data.roles.push(role);
    return this;
  }

  // Method to build the final project object
  build(): IProject {
    return { ...this.data };
  }

  // Static method to create a builder with randomized test data
  static createRandom(): ProjectBuilder {
    const randomId = `proj-${Math.floor(Math.random() * 10000)}`;
    return new ProjectBuilder()
      .withId(randomId)
      .withName(`Project ${randomId}`)
      .withUpdateAt(new Date());
  }
}
