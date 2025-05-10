/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import { TicketBuilder } from '../builder/TicketBuilder';
import '../../src/utils/arrayUtils';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import BacklogPage from '../../src/pages/BacklogPage/BacklogPage';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import SprintBuilder from '../builder/SprintBuilder';

describe('BacklogPage.cy.ts', () => {
  const sprint = new SprintBuilder().withName('Sprint 1').build();
  const projectDetailsData = new ProjectDetailsBuilder().addSprint(sprint).build();

  beforeEach(() => {
    cy.mockGlobalRequest();

    const projectDetailsUrl = `/projects/${defaultMockProject.id}/details`;
    cy.intercept('GET', `**${projectDetailsUrl}`, {
      statusCode: 200,
      body: projectDetailsData
    }).as('getProjectDetails');

    cy.setupTestEnvironment(
      <Route
        path="/projects/:projectId/backlog"
        element={
          <ProjectDetailsProvider>
            <BacklogPage />
          </ProjectDetailsProvider>
        }
      />,
      `/projects/${defaultMockProject.id}/backlog`
    );

    cy.wait('@getProjectDetails');
  });

  // it('Test filter search', () => {});

  // it('Test can open ticket', () => {});

  // it('Test filter select type', () => {});

  // it('Test filter epic', () => {});

  it.only('Test filter user', () => {
    const ticketsDefault = [new TicketBuilder().build()];

    const ticketsAssined = [
      new TicketBuilder().withAssign(defaultMockUser).build(),
      new TicketBuilder().withAssign(defaultMockUser).withSprint(sprint.id).build()
    ];

    cy.intercept('GET', `**/api/v2/projects/${defaultMockProject.id}/backlogs`, {
      statusCode: 200,
      body: [...ticketsDefault, ...ticketsAssined]
    }).as('getBacklog');

    cy.intercept(
      'GET',
      `**/api/v2/projects/${defaultMockProject.id}/backlogs?users=${defaultMockUser.id}`,
      {
        statusCode: 200,
        body: [...ticketsAssined]
      }
    ).as('getBacklogByUserId');

    cy.wait('@getBacklog');
    cy.get(`[data-testid="user-filter-${defaultMockUser.id}"]`).click();
    cy.wait('@getBacklogByUserId');

    for (const ticket of ticketsAssined) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('exist');
    }

    for (const ticket of ticketsDefault) {
      cy.get(`[data-testid="ticket-hover-${ticket.id}"]`).should('not.exist');
    }
  });

  // it('Test select sprint', () => {});
});
