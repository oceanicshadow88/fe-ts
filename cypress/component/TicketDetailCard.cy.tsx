/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import '../../src/utils/arrayUtils';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import TicketDetailCard from '../../src/components/TicketDetailCard/TicketDetailCard';
import { TicketBuilder } from '../builder/TicketBuilder';
import BoardBuilder from '../builder/BoardBuilder';
import StatusBuilder from '../builder/StatusBuilder';
import TypesBuilder from '../builder/TypeBuilder';

describe('TicketDetailCard.cy.ts', () => {
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

  const ticketData = new TicketBuilder(defaultMockProject).build();
  beforeEach(() => {
    const projectDetailsData = new ProjectDetailsBuilder(statuses, boards, ticketTypes, defaultMockUser.id).build();

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

  // it('Add Ticket', () => {});

  // it('Delete Delete', () => {});

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
