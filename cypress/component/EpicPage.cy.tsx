import { Route } from 'react-router-dom';
import '../../src/utils/arrayUtils';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import EpicPage from '../../src/pages/EpicPage/EpicPage';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import EpicBuilder from '../builder/EpicBuilder';
import StatusBuilder from '../builder/StatusBuilder';
import BoardBuilder from '../builder/BoardBuilder';
import TypesBuilder from '../builder/TypeBuilder';
import ModalProvider from '../../src/context/ModalProvider';

describe('Epic.cy.ts', () => {
  const epic = new EpicBuilder().withTitle('Test Epic').build();
  const statuses = ['To Do', 'In Progress', 'In Review', 'Done'].map((name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return new StatusBuilder().withName(name).withSlug(slug).withTenant(defaultMockUser.id).build();
  });

  const boards = ['Default Board 1', 'Default Board 2'].map((title) => {
    const statuses = ['To Do', 'In Progress', 'In Review', 'Done'].map((name) => 
      new StatusBuilder()
        .withName(name)
        .withSlug(name.toLowerCase().replace(/\s+/g, '-'))
        .withIsDefault(false)
        .build()
    )

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
    .addEpic(epic)
    .build();

  const interceptGetBacklog = ({ body }) => {
    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: body
    }).as('getBacklog');
  };

  beforeEach(() => {
    cy.mockGlobalRequest();

    const projectDetailsUrl = `/projects/${defaultMockProject.id}/details`;
    cy.intercept('GET', `**${projectDetailsUrl}`, {
      statusCode: 200,
      body: projectDetailsData
    }).as('getProjectDetails');
  });

  // Needs to be call after getBacklog intercept has been defined
  // to avoid race condition of the request
  const setupEpicTestEnvironment = () => {
    cy.setupTestEnvironment(
      <Route
        path="/projects/:projectId/epic"
        element={
          <ProjectDetailsProvider>
            <ModalProvider>
              <EpicPage />
            </ModalProvider>
          </ProjectDetailsProvider>
        }
      />,
      `/projects/${defaultMockProject.id}/epic`
    );

    cy.wait('@getProjectDetails');
  };

  it('Can create epic', () => {
    const epic = new EpicBuilder()
      .withTitle('New Test Sprint')
      .withStartDate("")
      .withDueAt("")
      .build();

    cy.intercept('POST', `**/api/v2/epics`, {
      statusCode: 200,
      body: {
        ...epic
      }
    }).as('createEpic');

    interceptGetBacklog({
      body: []
    });

    setupEpicTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get(`[data-testid="epic-create-epic-btn"]`).click();
    cy.get(`[data-testid="epic-name"]`).type(epic.title);
    cy.get(`[data-testid="epic-create-btn"]`).click();

    cy.wait('@createEpic');

    cy.get(`[data-testid="epic-${epic.id}"]`).should('exist').contains(epic.title);
  });

  it('Can edit epic title', () => {
    const updatedEpic = new EpicBuilder()
      .withId(epic.id)
      .withTitle('Updated Epic Title')
      .withStartDate("")
      .withDueAt("")
      .build();

    cy.intercept('PUT', `**/api/v2/epics/${epic.id}`, {
      statusCode: 200,
      body: {
        ...updatedEpic
      }
    }).as('updateEpic');

    interceptGetBacklog({
      body: []
    });

    setupEpicTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get(`[data-testid="epic-${epic.id}"]`).should('exist').contains(epic.title);
    cy.get(`[data-testid="icon-btn-actions-"]`).click();

    cy.get(`[data-testid="epic-name"]`).clear().type(updatedEpic.title);
    cy.get(`[data-testid="epic-edit-btn"]`).click();

    cy.wait('@updateEpic');

    cy.get(`[data-testid="epic-${updatedEpic.id}"]`).should('exist').contains(updatedEpic.title);
    cy.get(`[data-testid="epic-${epic.id}"]`).contains(epic.title).should('not.exist');
  });
});