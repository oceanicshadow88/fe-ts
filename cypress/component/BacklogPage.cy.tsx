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

describe('BacklogPage.cy.ts', () => {
  const sprint = new SprintBuilder().withName('Test Sprint').build();
  const epic = new EpicBuilder().withTitle('Test Epic').build();
  const projectDetailsData = new ProjectDetailsBuilder().addSprint(sprint).addEpic(epic).build();

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

    cy.document().then((doc) => {
      const style = doc.createElement('style');
      style.innerHTML = `
    [data-rbd-droppable-id] {
      min-height: 200px !important;
    }
  `;
      doc.head.appendChild(style);
    });
  };

  it('Test ticket title filter shows correct results', () => {
    const ticketDefault = new TicketBuilder().withTitle('Fix login bug').build();
    const ticketMatched = new TicketBuilder().withTitle('Test filter search successful').build();

    const keyword = 'successful';

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs?title=${keyword}`, {
      statusCode: 200,
      body: [ticketMatched]
    }).as('getSearchBacklogTickets');
    interceptGetBacklog({
      body: [ticketDefault, ticketMatched]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get('[data-testid="ticket-search"]').clear().type(keyword);

    cy.wait('@getSearchBacklogTickets');

    cy.get(`[data-testid="ticket-hover-${ticketMatched.id}"]`).should('exist');
    cy.get(`[data-testid="ticket-hover-${ticketDefault.id}"]`).should('not.exist');
  });

  it('Test filter search returns empty', () => {
    const ticket = new TicketBuilder().withTitle('Some ticket').build();
    const keyword = 'not-matching';
    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs?title=${keyword}`, {
      statusCode: 200,
      body: []
    }).as('getSearchTicketsEmpty');

    interceptGetBacklog({
      body: [ticket]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get('[data-testid="ticket-search"]').clear().type(keyword);
    cy.wait('@getSearchTicketsEmpty');

    cy.get('[data-testid="empty-ticket-result"]')
      .should('exist')
      .and('contain.text', 'There is nothing that matches this filter');
  });

  it.skip('Test can open ticket detail modal', () => {
    const ticket = new TicketBuilder()
      .withTitle('Test Ticket Open')
      .withId('680efaf72d0cf941d3f6e703')
      .build();

    cy.intercept('GET', `**/api/v2/tickets/${ticket.id}`, {
      statusCode: 200,
      body: {
        data: {
          ...ticket,
          project: { id: defaultMockProject.id },
          labels: [],
          description: '',
          attachmentUrls: [],
          type: null,
          status: null,
          priority: null,
          reporter: null,
          assign: null
        }
      }
    }).as('getTicketDetail');

    interceptGetBacklog({
      body: [ticket]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).dblclick();

    cy.wait('@getTicketDetail');

    cy.get('[data-testid="ticket-detail-title"]').should('exist').and('contain.text', ticket.title);
  });

  it.skip('Test open non-existent ticket returns error', () => {
    const ticket = new TicketBuilder().withId('fake-id').build();

    cy.intercept('GET', `**/api/v2/tickets/${ticket.id}`, {
      statusCode: 404,
      body: { message: 'Not found' }
    }).as('getTicketDetailError');

    interceptGetBacklog({ body: [ticket] });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).dblclick();
    cy.wait('@getTicketDetailError');
    cy.get('[data-testid="ticket-detail-title"]').should('not.exist');
  });

  it('Test delete a ticket in Backlog', () => {
    const ticketTitle = 'Delete me';
    const createdTicket = new TicketBuilder()
      .withTitle(ticketTitle)
      .withProject(defaultMockProject.id)
      .build();

    interceptGetBacklog({ body: [createdTicket] });

    setupBacklogTestEnvironment();
    cy.wait('@getBacklog');
    cy.get(`[data-testid="hover-show-option-btn-${createdTicket.id}"]`).click();
    cy.intercept('DELETE', `**/api/v2/tickets/${createdTicket.id}`, {
      statusCode: 204
    }).as('deleteTicket');

    interceptGetBacklog({ body: [] });

    cy.get(`[data-testid="delete-ticket-Delete"]`).click({ force: true });

    cy.wait('@deleteTicket');
    cy.wait('@getBacklog');

    cy.get(`[data-testid="ticket-hover-${createdTicket.id}"]`).should('not.exist');
  });

  it('can create a new ticket', () => {
    const newTicketTitle = 'This is a new ticket';
    const createdTicket = new TicketBuilder()
      .withTitle(newTicketTitle)
      .withId('created-123')
      .build();

    interceptGetBacklog({ body: [] });

    cy.intercept('POST', '**/api/v2/tickets', {
      statusCode: 201,
      body: createdTicket
    }).as('createTicket');

    interceptGetBacklog({ body: [createdTicket] });

    setupBacklogTestEnvironment();
    cy.wait('@getBacklog');

    cy.contains('Create Ticket').click();
    cy.get('[data-testid="create-issue-input"]', { timeout: 5000 }).should('be.visible');

    cy.get('[data-testid="create-issue-input"]').type(`${newTicketTitle}{enter}`);
    cy.wait('@createTicket');

    cy.get(`[data-testid="ticket-hover-${createdTicket.id}"]`).should(
      'contain.text',
      newTicketTitle
    );
  });

  it('allows dragging ticket from backlog to sprint', () => {
    const ticket = new TicketBuilder().withTitle('Move me to sprint').build();

    let isAfterMove = false;

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, (req) => {
      req.reply({
        statusCode: 200,
        body: isAfterMove ? [{ ...ticket, sprint: sprint.id }] : [ticket]
      });
    }).as('getBacklog');

    cy.intercept('PUT', `**/api/v2/tickets/${ticket.id}`, (req) => {
      isAfterMove = true;
      req.reply({
        statusCode: 200,
        body: {
          ...req.body,
          id: ticket.id
        }
      });
    }).as('updateTicketSprint');

    setupBacklogTestEnvironment();
    cy.wait('@getBacklog');

    cy.simulateDndForRBD(
      `[data-rbd-draggable-id="${ticket.id}"]`,
      `[data-rbd-droppable-id="${sprint.id}"]`
    );

    cy.wait('@updateTicketSprint');
    cy.wait('@getBacklog');
    cy.get(`[data-rbd-droppable-id="${sprint.id}"]`)
      .find(`[data-testid="ticket-hover-${ticket.id}"]`)
      .should('exist');
  });

  it('allows dragging ticket from sprint to backlog', () => {
    const ticket = new TicketBuilder()
      .withTitle('Move me to backlog')
      .withSprint(sprint.id)
      .build();

    let isAfterMove = false;

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, (req) => {
      req.reply({
        statusCode: 200,
        body: isAfterMove ? [{ ...ticket, sprint: null }] : [ticket]
      });
    }).as('getBacklog');

    cy.intercept('PUT', `**/api/v2/tickets/${ticket.id}`, (req) => {
      isAfterMove = true;
      req.reply({
        statusCode: 200,
        body: {
          ...req.body,
          id: ticket.id
        }
      });
    }).as('updateTicketSprint');

    setupBacklogTestEnvironment();
    cy.wait('@getBacklog');

    cy.simulateDndForRBD(
      `[data-rbd-draggable-id="${ticket.id}"]`,
      `[data-rbd-droppable-id="backlog"]`
    );

    cy.wait('@updateTicketSprint');
    cy.wait('@getBacklog');

    cy.get(`[data-rbd-droppable-id="backlog"]`)
      .find(`[data-testid="ticket-hover-${ticket.id}"]`)
      .should('exist');
  });

  it('allows dragging ticket from one sprint to another sprint', () => {
    const sprintA = new SprintBuilder().withName('Sprint A').build();
    const sprintB = new SprintBuilder().withName('Sprint B').build();

    const ticket = new TicketBuilder()
      .withTitle('Move me between sprints')
      .withSprint(sprintA.id)
      .build();

    const localProjectDetailsData = new ProjectDetailsBuilder()
      .addSprint(sprintA)
      .addSprint(sprintB)
      .build();

    let isAfterMove = false;

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/details`, {
      statusCode: 200,
      body: localProjectDetailsData
    }).as('getProjectDetails');

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, (req) => {
      req.reply({
        statusCode: 200,
        body: isAfterMove
          ? [{ ...ticket, sprint: sprintB.id }]
          : [{ ...ticket, sprint: sprintA.id }]
      });
    }).as('getBacklog');

    cy.intercept('PUT', `**/api/v2/tickets/${ticket.id}`, (req) => {
      isAfterMove = true;
      req.reply({
        statusCode: 200,
        body: {
          ...req.body,
          id: ticket.id
        }
      });
    }).as('updateTicketSprint');

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
    cy.wait('@getBacklog');

    cy.simulateDndForRBD(
      `[data-rbd-draggable-id="${ticket.id}"]`,
      `[data-rbd-droppable-id="${sprintB.id}"]`
    );

    cy.wait('@updateTicketSprint');
    cy.wait('@getBacklog');

    cy.get(`[data-rbd-droppable-id="${sprintB.id}"]`)
      .find(`[data-testid="ticket-hover-${ticket.id}"]`)
      .should('exist');
  });

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
      new TicketBuilder().withSprint(sprint.id).build()
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

    cy.intercept('PUT', `**/api/v2/tickets/${ticketsDefault.id}`, {
      statusCode: 200,
      body: {
        ...ticketsDefault,
        priority: priority
      }
    }).as('updateTicketPriority');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);
    cy.get(`[data-testid="priority-btn-${ticketsDefault.id}"]`).click();
    cy.get(`[data-testid="priority-dropdown-btn-${ticketsDefault.id}-${priority}"]`).click();

    interceptGetBacklog({
      body: [
        {
          ...ticketsDefault,
          priority: priority
        }
      ]
    });

    cy.wait('@updateTicketPriority');
    cy.wait('@getBacklog');

    cy.get(`[data-testid="priority-dropdown-btn-${ticketsDefault.id}-${priority}"]`).contains(
      priority
    );
  });

  it('Can change ticket title', () => {
    const ticketsDefault = new TicketBuilder().build();

    const newTitle = 'New Title';

    cy.intercept('PUT', `**/api/v2/tickets/${ticketsDefault.id}`, {
      statusCode: 200,
      body: {
        ...ticketsDefault,
        title: newTitle
      }
    }).as('updateTicketTitle');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: [
        {
          ...ticketsDefault,
          title: newTitle
        }
      ]
    }).as('getUpdatedBacklog');

    // Force click because the element is not visible,
    // and the visibility cannot be checked as it is triggered by css hover
    cy.get(`[data-testid="icon-btn-edit-${ticketsDefault.id}"]`).click({ force: true });
    cy.get(`[data-testid="ticket-title-input-${ticketsDefault.id}"]`)
      .clear()
      .type(newTitle)
      .type('{enter}');

    cy.wait('@updateTicketTitle');
    cy.wait('@getUpdatedBacklog');

    cy.get(`[data-testid="ticket-hover-${ticketsDefault.id}"]`).contains(newTitle);
  });

  it('Can change ticket assign', () => {
    const ticketsDefault = new TicketBuilder().build();

    cy.intercept('PUT', `**/api/v2/tickets/${ticketsDefault.id}`, {
      statusCode: 200,
      body: {
        ...ticketsDefault,
        assign: defaultMockUser
      }
    }).as('updateTicketAssign');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: [
        {
          ...ticketsDefault,
          assign: defaultMockUser
        }
      ]
    }).as('getUpdatedBacklog');

    cy.get(`[data-testid="assignee-btn-${ticketsDefault.id}"]`).click();
    cy.get(`[data-testid="assignee-btn-${ticketsDefault.id}-${defaultMockUser.id}"]`).click();

    cy.wait('@updateTicketAssign');
    cy.wait('@getUpdatedBacklog');

    cy.get(`[data-testid="assignee-btn-${ticketsDefault.id}"]`).contains(defaultMockUser.name);
  });

  it('Can add to sprint', () => {
    const sprint = new SprintBuilder().withName('New Test Sprint').build();

    cy.intercept('POST', `**/api/v2/sprints`, {
      statusCode: 200,
      body: {
        ...sprint
      }
    }).as('createSprint');

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
    cy.get('@copyText').should(
      'have.been.calledWith',
      `${window.location.origin}/tickets/${ticketsDefault.id}`
    );
  });

  it('Can change status', () => {
    const ticketsDefault = new TicketBuilder().build();
    const status = projectDetailsData.statues[0];

    cy.intercept('PUT', `**/api/v2/tickets/${ticketsDefault.id}`, {
      statusCode: 200,
      body: {
        ...ticketsDefault,
        status: status.id
      }
    }).as('updateTicketType');

    interceptGetBacklog({
      body: [ticketsDefault]
    });

    setupBacklogTestEnvironment();

    cy.wait(`@getBacklog`);

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: [
        {
          ...ticketsDefault,
          status: status.id
        }
      ]
    }).as('getUpdatedBacklog');

    cy.get(`[data-testid="status-container-${ticketsDefault.id}"]`).click();
    cy.get(`[data-testid="status-drop-item-${ticketsDefault.id}-${status.id}"]`).click();

    cy.wait('@updateTicketType');
    cy.wait('@getUpdatedBacklog');

    cy.get(`[data-testid="status-drop-btn-${ticketsDefault.id}"]`);
  });
});
