/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import { BoardBuilder } from '../builder/BoardBuilder';
import '../../src/utils/arrayUtils';
import { defaultMockProject } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import BacklogPage from '../../src/pages/BacklogPage/BacklogPage';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';

describe('BacklogPage.cy.ts', () => {
  beforeEach(() => {
    const boardData = new BoardBuilder().build();
    const projectDetailsData = new ProjectDetailsBuilder().build();
    cy.mockGlobalRequest();

    const url = `/projects/${defaultMockProject.id}/backlogs`;
    cy.intercept('GET', `**${url}`, {
      statusCode: 200,
      body: boardData
    }).as('getBacklog');

    const projectDetailsUrl = `/projects/${defaultMockProject.id}/details`;
    cy.intercept('GET', `**${projectDetailsUrl}`, {
      statusCode: 200,
      body: projectDetailsData
    }).as('getDetails');

    cy.setupTestEnvironment(
      <Route
        path="/projects/:projectId/backlogs"
        element={
          <ProjectDetailsProvider>
            <BacklogPage />
          </ProjectDetailsProvider>
        }
      />,
      url
    );

    cy.wait('@getBacklog');
  });

  // it('Test filter search', () => {});

  // it('Test can open ticket', () => {});

  // it('Test filter select type', () => {});

  // it('Test filter epic', () => {});

  // it('Test filter user', () => {});

  // it('Test select sprint', () => {});
});
