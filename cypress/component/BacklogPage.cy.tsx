/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import { TicketBuilder } from '../builder/TicketBuilder';
import '../../src/utils/arrayUtils';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import BacklogPage from '../../src/pages/BacklogPage/BacklogPage';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';

describe('BacklogPage.cy.ts', () => {
  beforeEach(() => {
    const backlogData: any[] = [];
    for (let i = 0; i < 10; i++) {
      backlogData.push(new TicketBuilder().build());
    }

    const projectDetailsData = new ProjectDetailsBuilder().build();
    cy.mockGlobalRequest();

    const url = `/projects/${defaultMockProject.id}/backlogs`;
    cy.intercept('GET', `**${url}`, {
      statusCode: 200,
      body: backlogData
    }).as('getBacklog');

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

    cy.wait('@getBacklog');
    cy.wait('@getProjectDetails');
  });

  it('Test filter search', () => {});

  it('Test can open ticket', () => {});

  it('Test filter select type', () => {});

  it('Test filter epic', () => {});

  it('Test filter user', () => {});

  it('Test select sprint', () => {});
});
