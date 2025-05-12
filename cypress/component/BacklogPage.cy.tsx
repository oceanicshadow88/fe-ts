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
});
