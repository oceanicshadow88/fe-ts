/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
/* eslint-disable jest/expect-expect */
import React from 'react';
import { Route } from 'react-router-dom';
import { TicketBuilder } from '../builder/TicketBuilder';
import '../../src/utils/arrayUtils';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import BacklogPage from '../../src/pages/BacklogPage/BacklogPage';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import SprintBuilder from '../builder/SprintBuilder';
import EpicBuilder from '../builder/EpicBuilder';
import ModalProvider from '../../src/context/ModalProvider';
import { doc } from 'prettier';

describe('BacklogPage.cy.ts', () => {
  const sprint = new SprintBuilder().withName('Test Sprint').build();
  const epic = new EpicBuilder().withTitle('Test Epic').build();
  const projectDetailsData = new ProjectDetailsBuilder()
    .addSprint(sprint)
    .addEpic(epic)
    .build();
  
  const interceptGetBacklog = ({ body }) => {
    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: body
    }).as('getBacklog');
  }

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
  const setupBacklogTestEnvironment = () => {
    cy.setupTestEnvironment(
      <Route
        path="/projects/:projectId/backlog"
        element={
          <ProjectDetailsProvider>
            <ModalProvider>
              <BacklogPage />
            </ModalProvider>
          </ProjectDetailsProvider>
        }
      />,
      `/projects/${defaultMockProject.id}/backlog`
    );
    
    cy.wait('@getProjectDetails');
  }

  it('Test filter search successful', () => {
    const ticketDefault = new TicketBuilder().withTitle('Fix login bug').build();
    const ticketMatched = new TicketBuilder().withTitle('Test filter search successful').build();

    interceptGetBacklog({
      body: [ticketDefault, ticketMatched]
    });

    setupBacklogTestEnvironment();

    const keyword = 'successful';

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs?title=${keyword}`, {
      statusCode: 200,
      body: [ticketMatched]
    }).as('getSearchBacklogTickets');

    cy.wait(`@getBacklog`);

    cy.get('[data-testid="ticket-search"]').clear().type(keyword);

    cy.wait('@getSearchBacklogTickets');

    cy.get(`[data-testid="ticket-hover-${ticketMatched.id}"]`).should('exist');
    cy.get(`[data-testid="ticket-hover-${ticketDefault.id}"]`).should('not.exist');
  });

  it('Test filter search failed', () => {
    const keyword = 'failed';

    const ticketDefault = new TicketBuilder().withTitle('Fix login bug').build();
    const ticketMatched = new TicketBuilder().withTitle('Test filter search successful').build();

    interceptGetBacklog({
      body: [ticketDefault, ticketMatched]
    });

    setupBacklogTestEnvironment();

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs?title=${keyword}`, {
      statusCode: 200,
      body: [ticketMatched]
    }).as('getSearchBacklogTickets');

    cy.wait(`@getBacklog`);

    cy.get('[data-testid="ticket-search"]').clear().type(keyword);

    cy.wait('@getSearchBacklogTickets');

    cy.get(`[data-testid="ticket-hover-${ticketMatched.id}"]`).should('exist');
    cy.get(`[data-testid="ticket-hover-${ticketDefault.id}"]`).should('not.exist');
  });

  // it('Test can open ticket', () => {});

  it('Test filter select type', () => {
    const ticketsDefault = [
      new TicketBuilder().build(),
      new TicketBuilder().withSprint(sprint.id).build()
    ];

    const ticketType = projectDetailsData.ticketTypes[0];

    const ticketsTask = [
      new TicketBuilder().withType(ticketType).build(),
      new TicketBuilder().withType(ticketType).withSprint(sprint.id).build()
    ];

    interceptGetBacklog({
      body: [...ticketsDefault, ...ticketsTask]
    });

    setupBacklogTestEnvironment();

    cy.intercept(
      'GET',
      `**/api/v2/projects/${defaultMockProject.id}/backlogs?ticketTypes=${ticketType.id}`,
      {
        statusCode: 200,
        body: [...ticketsTask]
      }
    ).as('getBacklogByType');

    cy.wait(`@getBacklog`);

    cy.get('[data-testid="type-filter"]').click();
    cy.get(`[data-testid="ticket-type-item-${ticketType.id}"]`).click();
    cy.wait('@getBacklogByType');

    for (const ticket of ticketsTask) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('exist');
    }

    for (const ticket of ticketsDefault) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('not.exist');
    }
  });

  it('Test filter epic', () => {
    const ticketsDefault = [
      new TicketBuilder().build(),
      new TicketBuilder().withSprint(sprint.id).build(),
    ];
    
    const ticketsEpic = [
      new TicketBuilder().withEpic(epic.id).build(),
      new TicketBuilder().withEpic(epic.id).withSprint(sprint.id).build()
    ];

    interceptGetBacklog({
      body: [...ticketsDefault, ...ticketsEpic]
    });

    setupBacklogTestEnvironment();

    cy.intercept(
      'GET',
      `**/api/v2/projects/${defaultMockProject.id}/backlogs?ticketEpics=${epic.id}`,
      {
        statusCode: 200,
        body: [...ticketsEpic]
      }
    ).as('getBacklogByEpic');

    cy.wait(`@getBacklog`);

    cy.get('[data-testid="epic-filter"]').click();
    cy.get(`[data-testid="epic-filter-item-${epic.id}"]`).click();
    cy.wait('@getBacklogByEpic');

    for (const ticket of ticketsEpic) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('exist');
    }

    for (const ticket of ticketsDefault) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('not.exist');
    }
  });

  it('Test filter user', () => {
    const ticketsDefault = [new TicketBuilder().build()];

    const ticketsAssined = [
      new TicketBuilder().withAssign(defaultMockUser).build(),
      new TicketBuilder().withAssign(defaultMockUser).withSprint(sprint.id).build()
    ];

    interceptGetBacklog({
      body: [...ticketsDefault, ...ticketsAssined]
    });

    setupBacklogTestEnvironment();

    cy.intercept(
      'GET',
      `**/api/v2/projects/${defaultMockProject.id}/backlogs?users=${defaultMockUser.id}`,
      {
        statusCode: 200,
        body: [...ticketsAssined]
      }
    ).as('getBacklogByUserId');

    cy.wait(`@getBacklog`);
    cy.get(`[data-testid="user-filter-${defaultMockUser.id}"]`).click();
    cy.wait('@getBacklogByUserId');

    for (const ticket of ticketsAssined) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('exist');
    }

    for (const ticket of ticketsDefault) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('not.exist');
    }
  });

  it('Test show sprint', () => {
    const ticketsDefault = [
      new TicketBuilder().build(),
      new TicketBuilder().withSprint(sprint.id).build()
    ];

    interceptGetBacklog({
      body: [...ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get(`[data-testid="sprint-${sprint.id}"]`).contains(sprint.name);

    for (const ticket of ticketsDefault) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('exist');
    }
  });

  it('Can change ticket priority', () => {
    const ticketsDefault = new TicketBuilder().build();
    const priority = 'Highest';

    cy.intercept(
      'PUT',
      `**/api/v2/tickets/${ticketsDefault.id}`,
      {
        statusCode: 200,
        body: {
          ...ticketsDefault,
          priority: priority
        }
      }
    ).as('updateTicketPriority');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);
    cy.get(`[data-testid="priority-btn-${ticketsDefault.id}"]`).click();
    cy.get(`[data-testid="priority-dropdown-btn-${ticketsDefault.id}-${priority}"]`).click();

    interceptGetBacklog({
      body: [{
        ...ticketsDefault,
        priority: priority
      }]
    });

    cy.wait('@updateTicketPriority');
    cy.wait('@getBacklog');

    cy.get(`[data-testid="priority-dropdown-btn-${ticketsDefault.id}-${priority}"]`).contains(priority);
  });

  it('Can change ticket title', () => {
    const ticketsDefault = new TicketBuilder().build();

    const newTitle = 'New Title';

    cy.intercept(
      'PUT',
      `**/api/v2/tickets/${ticketsDefault.id}`,
      {
        statusCode: 200,
        body: {
          ...ticketsDefault,
          title: newTitle
        }
      }
    ).as('updateTicketTitle');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: [{
        ...ticketsDefault,
        title: newTitle
      }]
    }).as('getUpdatedBacklog');

    // Force click because the element is not visible, 
    // and the visibility cannot be checked as it is triggered by css hover
    cy.get(`[data-testid="icon-btn-edit-${ticketsDefault.id}"]`).click({ force: true });
    cy.get(`[data-testid="ticket-title-input-${ticketsDefault.id}"]`).clear().type(newTitle).type('{enter}');

    cy.wait('@updateTicketTitle');
    cy.wait('@getUpdatedBacklog');

    cy.get(`[data-testid="ticket-hover-${ticketsDefault.id}"]`).contains(newTitle);
  });

  it('Can change ticket assign', () => {
    const ticketsDefault = new TicketBuilder().build();

    cy.intercept(
      'PUT',
      `**/api/v2/tickets/${ticketsDefault.id}`,
      {
        statusCode: 200,
        body: {
          ...ticketsDefault,
          assign: defaultMockUser
        }
      }
    ).as('updateTicketAssign');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: [{
        ...ticketsDefault,
        assign: defaultMockUser
      }]
    }).as('getUpdatedBacklog');

    cy.get(`[data-testid="assignee-btn-${ticketsDefault.id}"]`).click();
    cy.get(`[data-testid="assignee-btn-${ticketsDefault.id}-${defaultMockUser.id}"]`).click();

    cy.wait('@updateTicketAssign');
    cy.wait('@getUpdatedBacklog');

    cy.get(`[data-testid="assignee-btn-${ticketsDefault.id}"]`).contains(defaultMockUser.name);
  });

  it('Can add to sprint', () => {
  
    const sprint = new SprintBuilder().withName('New Test Sprint').build();

    cy.intercept(
      'POST',
      `**/api/v2/sprints`,
      {
        statusCode: 200,
        body: {
          ...sprint
        }
      }
    ).as('createSprint');

    interceptGetBacklog({
      body: []
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get(`[data-testid="backlog-create-sprint-btn"]`).click();
    cy.get(`[data-testid="sprint-name"]`).type(sprint.name);
    cy.get(`[data-testid="sprint-submit-btn"]`).click();
    
    cy.wait('@createSprint');

    cy.get(`[data-testid="sprint-${sprint.id}"]`).should('exist').contains(sprint.name);
  });

  it('Can copy link', () => {
    const ticketsDefault = new TicketBuilder().build();

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').as('copyText');
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get(`[data-testid="icon-btn-copy-link-${ticketsDefault.id}"]`).click({ force: true });
    cy.get('@copyText').should('have.been.calledWith', `${window.location.origin}/tickets/${ticketsDefault.id}`);
  });

  it('Can change status', () => {
    const ticketsDefault = new TicketBuilder().build();
    const status = projectDetailsData.statues[0];

    cy.intercept(
      'PUT',
      `**/api/v2/tickets/${ticketsDefault.id}`,
      {
        statusCode: 200,
        body: {
          ...ticketsDefault,
          status: status.id
        }
      }
    ).as('updateTicketType');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: [{
        ...ticketsDefault,
        status: status.id
      }]
    }).as('getUpdatedBacklog');

    cy.get(`[data-testid="status-container-${ticketsDefault.id}"]`).click() ;
    cy.get(`[data-testid="status-drop-item-${ticketsDefault.id}-${status.id}"]`).click();

    cy.wait('@updateTicketType');
    cy.wait('@getUpdatedBacklog');

    cy.get(`[data-testid="status-drop-btn-${ticketsDefault.id}"]`);
  });


});
