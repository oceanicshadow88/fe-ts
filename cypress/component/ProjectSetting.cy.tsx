import React from 'react';
import { Route } from 'react-router-dom';
import Setting from '../../src/pages/Setting/Setting';
import { defaultMockProject } from '../support/component';

describe('ProjectPage.cy.ts', () => {
  beforeEach(function () {
    cy.mockGlobalRequest();

    cy.intercept('GET', `**/api/v2/projects/1111`, {
      statusCode: 200,
      body: defaultMockProject
    }).as('getProject');

    cy.setupTestEnvironment(
      <Route path="/projects/:projectId" element={<Setting />} />,
      '/projects/1111'
    );
    cy.wait('@getProject');
  });

  it('GET Project', () => {
    cy.get('[data-testid="projectName"]').should('have.value', 'TT');
  });

  it('Delete Project', () => {
    cy.intercept('DELETE', `**/api/v2/projects/1111`, {
      statusCode: 200,
      body: {}
    }).as('deleteProject');

    cy.get('[data-testid="delete-project"]').click();
    cy.get('[data-testid="confirm-delete"]').click();
    cy.wait('@deleteProject');
  });

  it('Edit Project', () => {
    cy.get('[data-testid="projectName"]').clear().type('POLI');
    cy.get('[data-testid="projectKey"]').should('have.value', 'POL');
    cy.get('[data-testid="projectUpdateBtn"]').click();
  });
});
