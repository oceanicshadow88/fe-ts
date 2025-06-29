import { Route } from 'react-router-dom';
import '../../src/utils/arrayUtils';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import ModalProvider from '../../src/context/ModalProvider';
import RetroPage from '../../src/pages/RetroPage/RetroPage';
import SprintBuilder from '../builder/SprintBuilder';
import StatusBuilder from '../builder/StatusBuilder';
import BoardBuilder from '../builder/BoardBuilder';
import TypesBuilder from '../builder/TypeBuilder';
import { RetroBoardBuilder, RetroStatusBuilder, RetroItemBuilder } from '../builder/RetroBuilder';

describe('RetroPage.cy.ts', () => {
  const sprint = new SprintBuilder()
    .withName('Sprint 1')
    .withCurrentSprint(true)
    .build();

  const statuses = ['To Do', 'In Progress', 'In Review', 'Done'].map((name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return new StatusBuilder().withName(name).withSlug(slug).withTenant(defaultMockUser.id).build();
  });

  const retroStatuses = ['Went Well', 'To Improve', 'Discuss/Ideas'].map((name) => {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      return new RetroStatusBuilder()
        .withDescription(name)
        .withSlug(slug)
        .withTenant(defaultMockUser.id)
        .build();
    });

  const retro = new RetroBoardBuilder()
    .withStatuses(retroStatuses)
    .withIsPublic(false)
    .build();

  const boards = ['Default Board 1', 'Default Board 2'].map((title) => {
    return new BoardBuilder(statuses)
      .withTitle(title)
      .withTenant(defaultMockUser.id)
      .addStatuses(...statuses)
      .build();
  });

  const typeIconMap: Record<string, string> = {
    'Story':
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10315?size=medium',
    'Task': 
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium',
    'Bug': 
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium',
    'Tech Debt':
      'https://010001.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10308?size=medium'
  };

  const ticketTypes = Object.entries(typeIconMap).map(([name, icon]) => {
    return {
      ...new TypesBuilder().withName(name).withIcon(icon).build(),
      slug: name.toLowerCase()
    };
  });

  const projectDetailsData = new ProjectDetailsBuilder(statuses, boards, ticketTypes, defaultMockUser.id)
    .addSprint(sprint)
    .addRetroBoard(retro)
    .build();

  const setupRetroTestEnvironment = () => {
    cy.setupTestEnvironment(
      <Route
        path="/projects/:projectId/retro"
        element={
          <ProjectDetailsProvider>
            <ModalProvider>
              <RetroPage />
            </ModalProvider>
          </ProjectDetailsProvider>
        }
      />,
      `/projects/${defaultMockProject.id}/retro`
    );

    cy.wait('@getProjectDetails');
    cy.wait('@getRetroBoards');
  }

  beforeEach(() => {
    cy.mockGlobalRequest();

    const projectDetailsUrl = `/projects/${defaultMockProject.id}/details`;
    cy.intercept('GET', `**${projectDetailsUrl}`, {
      statusCode: 200,
      body: projectDetailsData
    }).as('getProjectDetails');

    cy.intercept('GET', `**/sprints/${sprint.id}/retro`, {
      statusCode: 200,
      body: [retro],
    }).as('getRetroBoards');
  });
  
  it('Can create retro item', () => {
    cy.intercept('GET', `**/sprints/${sprint.id}/retro/items`, {
      statusCode: 200,
      body: [],
    }).as('getRetroItems');

    
    const retroItem = new RetroItemBuilder()
    .withContent('Test Retro Item')
    .withSprint(sprint.id)
    .withTenant(defaultMockUser.id)
    .withStatus(retroStatuses[0].id)
    .build();
    
    cy.intercept('POST', `**/sprints/${sprint.id}/retro/items`, {
      statusCode: 200,
      body: retroItem,
    }).as('createRetroItem');
    
    setupRetroTestEnvironment();
    
    cy.wait('@getRetroItems');

    cy.get(`[data-testid="create-retro-item-${retroStatuses[0].id}-button"]`).click();
    cy.get(`[data-testid="create-retro-item-${retroStatuses[0].id}-input"]`)
      .type(retroItem.content)
      .type('{enter}');

    cy.wait('@createRetroItem');

    cy.get(`[data-testid="ticket-${retroItem.id}"]`).should('exist');
    cy.get(`[data-testid="ticket-${retroItem.id}"]`).contains(retroItem.content);
  });

  it('Can delete retro item', () => {
    const retroItem = new RetroItemBuilder()
      .withContent('Test Retro Item')
      .withSprint(sprint.id)
      .withTenant(defaultMockUser.id)
      .withStatus(retroStatuses[0].id)
      .build();

    cy.intercept('GET', `**/sprints/${sprint.id}/retro/items`, {
      statusCode: 200,
      body: [retroItem],
    }).as('getRetroItems');

    
    cy.intercept('DELETE', `**/retro/items/${retroItem.id}`, {
      statusCode: 200,
    }).as('deleteRetroItem');
    
    setupRetroTestEnvironment();
    
    cy.wait('@getRetroItems');
    
    cy.get(`[data-testid="ticket-${retroItem.id}"]`).should('exist');
    cy.get(`[data-testid="delete-retro-item-${retroItem.id}"]`).click();
    cy.wait('@deleteRetroItem');
    cy.get(`[data-testid="ticket-${retroItem.id}"]`).should('not.exist');
  });

  it('Can move retro item to different class', () => {
    const retroItem = new RetroItemBuilder()
      .withContent('Test Retro Item')
      .withSprint(sprint.id)
      .withTenant(defaultMockUser.id)
      .withStatus(retroStatuses[0].id)
      .build();

    cy.intercept('GET', `**/sprints/${sprint.id}/retro/items`, {
      statusCode: 200,
      body: [retroItem],
    }).as('getRetroItems');

    cy.intercept('PUT', `**/retro/items/${retroItem.id}`, {
      statusCode: 200,
      body: {
        ...retroItem,
        status: retroStatuses[1].id,
      },
    }).as('updateRetroItem');

    setupRetroTestEnvironment();

    cy.wait('@getRetroItems');

    cy.get(`[data-rbd-droppable-id="${retroStatuses[0].id}"]`)
      .find(`[data-testid="ticket-${retroItem.id}"]`)
      .should('exist');

    cy.get(`[data-rbd-droppable-id="${retroStatuses[1].id}"]`)
      .find(`[data-testid="ticket-${retroItem.id}"]`)
      .should('not.exist');

    cy.dragAndDrop(
      `[data-rbd-draggable-id="${retroItem.id}"]`,
      `[data-rbd-droppable-id="${retroStatuses[1].id}"]`
    )

    cy.wait('@updateRetroItem');

    cy.get(`[data-rbd-droppable-id="${retroStatuses[0].id}"]`)
      .find(`[data-testid="ticket-${retroItem.id}"]`)
      .should('not.exist');

    cy.get(`[data-rbd-droppable-id="${retroStatuses[1].id}"]`)
      .find(`[data-testid="ticket-${retroItem.id}"]`)
      .should('exist');
  });
});