/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import '../../src/utils/arrayUtils';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import { defaultMockProject } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import TicketDetailCard from '../../src/components/TicketDetailCard/TicketDetailCard';
import { TicketBuilder } from '../builder/TicketBuilder';

describe('TicketDetailCard.cy.ts', () => {
  const ticketData = new TicketBuilder().build();
  beforeEach(() => {
    const projectDetailsData = new ProjectDetailsBuilder().build();

    cy.mockGlobalRequest();

    const url = `/tickets/${ticketData.id}`;
    cy.intercept('GET', `**${url}`, {
      statusCode: 200,
      body: ticketData
    }).as('getTicketDetails');

    cy.intercept('GET', `**/labels`, {
      statusCode: 200,
      body: []
    }).as('getProjectLabels');

    cy.intercept('GET', `**/comments/${ticketData.id}`, {
      statusCode: 200,
      body: []
    }).as('getComments');

    const projectDetailsUrl = `/projects/${defaultMockProject.id}/details`;
    cy.intercept('GET', `**${projectDetailsUrl}`, {
      statusCode: 200,
      body: projectDetailsData
    }).as('getDetails');

    cy.setupTestEnvironment(
      <Route
        path="/tickets/:ticketId"
        element={
          <ProjectDetailsProvider>
            <TicketDetailCard
              ticketId={ticketData.id}
              onDeletedTicket={() => {}}
              onSavedTicket={() => {}}
              projectId={defaultMockProject.id}
            />
          </ProjectDetailsProvider>
        }
      />,
      url
    );

    cy.wait('@getTicketDetails');
    cy.wait('@getProjectLabels');
    cy.wait('@getComments');
  });

  it('Add Ticket', () => {});

  it('Delete Delete', () => {});

  it('Edit Priority', () => {
    cy.get(`[data-testid="priority"]`).contains('Medium');
    cy.get(`[data-testid="priority"]`).click();
    cy.get(`[data-testid="Highest"]`).click();
    cy.get(`[data-testid="priority"]`).contains('Highest');
  });

  it('Edit Reporter', () => {
    cy.get(`[data-testid="reporter"]`).click();
  });
});
