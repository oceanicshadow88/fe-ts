import React from 'react';

import { Route } from 'react-router-dom';
import { ProjectBuilder } from '../builder/ProjectBuilder';
import ProjectPage from '../../src/pages/ProjectPage/ProjectPage';
import { defaultMockProject } from '../support/component';

describe('ProjectPage.cy.ts', () => {
  const createProject = ProjectBuilder.createRandom().withName('PROJECT').build();
  const mockProjects = [defaultMockProject];

  beforeEach(function () {
    cy.mockGlobalRequest();
    cy.intercept('POST', `**/api/v2/projects`, {
      statusCode: 200,
      body: {}
    }).as('createProject');

    cy.setupTestEnvironment(<Route path="/projects" element={<ProjectPage />} />, '/projects');
  });

  it('Add Project', () => {
    cy.intercept('GET', `**/api/v2/projects`, {
      statusCode: 200,
      body: [...mockProjects, createProject]
    }).as('getProjectsAfter');
    cy.get('[data-testid="board-create-card"]').click();
    cy.get('[data-testid="name"]').type(createProject.name);
    cy.get('[data-testid="websiteUrl"]').type('http://www.techscrumapp.com');
    cy.get('[data-testid="project-description"]').type('desc');
    cy.get('[data-testid="key"]').should('have.value', 'PRO');
    cy.get('[data-testid="project-lead"]').click();
    cy.get('[data-testid="leader-name-techscrum"]').click();
    cy.get('[data-testid="save"]').click();
    cy.wait('@createProject');
    cy.wait('@getProjectsAfter');
    cy.get(`[data-testid="${createProject.name.toLowerCase()}"]`).contains(createProject.name);
  });

  it('Delete Project', () => {
    cy.intercept('DELETE', `**/api/v2/projects/default-project-id`, {
      statusCode: 200,
      body: {}
    }).as('deleteProject');
    cy.intercept('GET', `**/api/v2/projects`, {
      statusCode: 200,
      body: []
    }).as('getProjectsAfter');

    cy.get('[data-testid="project-expand-btn-default-project-id"]').click();
    cy.get('[data-testid="project-delete"]').click();
    cy.get('[data-testid="confirm-delete"]').click();
    cy.wait('@deleteProject');
    cy.wait('@getProjectsAfter');
    cy.get('[data-testid="project-expand-btn-default-project-id"]').should('not.exist');
  });

  it('Edit Project', () => {
    cy.intercept('DELETE', `**/api/v2/projects/default-project-id`, {
      statusCode: 200,
      body: {}
    }).as('deleteProject');
    cy.intercept('GET', `**/api/v2/projects`, {
      statusCode: 200,
      body: []
    }).as('getProjectsAfter');

    cy.get('[data-testid="project-expand-btn-default-project-id"]').click();
    cy.get('[data-testid="project-details"]')
      .parent()
      .should('have.attr', 'href')
      .and('include', '/settings/default-project-id');
  });
});
