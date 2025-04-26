import { IProject, IUserInfo, IRole } from '../../src/types'; // Adjust the import path as needed

export class ProjectBuilder {
  private data: IProject;

  constructor() {
    // Initialize with default values
    this.data = {
      id: 'default-project-id',
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
  withId(id: string): ProjectBuilder {
    this.data.id = id;
    return this;
  }

  withName(name: string): ProjectBuilder {
    this.data.name = name;
    return this;
  }

  withIconUrl(iconUrl: string): ProjectBuilder {
    this.data.iconUrl = iconUrl;
    return this;
  }

  withType(type: string): ProjectBuilder {
    this.data.type = type;
    return this;
  }

  withBoard(board: string): ProjectBuilder {
    this.data.board = board;
    return this;
  }

  withProjectLead(projectLead: IUserInfo): ProjectBuilder {
    this.data.projectLead = projectLead;
    return this;
  }

  withUpdateAt(updateAt: Date): ProjectBuilder {
    this.data.updateAt = updateAt;
    return this;
  }

  withRoles(roles: IRole[]): ProjectBuilder {
    this.data.roles = roles;
    return this;
  }

  withDefaultRetroBoard(defaultRetroBoard: string): ProjectBuilder {
    this.data.defaultRetroBoard = defaultRetroBoard;
    return this;
  }

  withShortcut(shortcut: any): ProjectBuilder {
    this.data.shortcut = shortcut;
    return this;
  }

  // Add a role to the existing roles array
  addRole(role: IRole): ProjectBuilder {
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
