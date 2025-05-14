/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import '../../src/utils/arrayUtils';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import { defaultMockProject } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import ProjectMembersPage from '../../src/pages/ProjectMembersPage/ProjectMembersPage';
import { MemberBuilder } from '../builder/MemberBuilder';
import { RoleBuilder } from '../builder/RoleBuilder';
import ModalProvider from '../../src/context/ModalProvider';

describe('MemberPage.cy.ts', () => {
  beforeEach(() => {
    const boardData = new MemberBuilder().build();
    const rolesData = new RoleBuilder().build();
    const projectDetailsData = new ProjectDetailsBuilder().build();
    const url = `/projects/${defaultMockProject.id}/members`;

    cy.mockGlobalRequest();
    cy.intercept('GET', `**${url}`, {
      statusCode: 200,
      body: boardData
    }).as('getMembers');

    const projectDetailsUrl = `/projects/${defaultMockProject.id}/details`;
    cy.intercept('GET', `**${projectDetailsUrl}`, {
      statusCode: 200,
      body: projectDetailsData
    }).as('getDetails');

    const projectRolesUrl = `/projects/${defaultMockProject.id}/roles`;
    cy.intercept('GET', `**${projectRolesUrl}`, {
      statusCode: 200,
      body: rolesData
    }).as('getRoles');

    cy.setupTestEnvironment(
      <Route
        path="/projects/:projectId/members"
        element={
          <ModalProvider>
            <ProjectDetailsProvider>
              <ProjectMembersPage />
            </ProjectDetailsProvider>
          </ModalProvider>
        }
      />,
      url
    );

    cy.wait('@getMembers');
    cy.wait('@getRoles');
  });

  it('Add Member', () => {
    cy.get('[data-testid="invite-members"]').click();
    cy.get('[data-testid="email"]').type('techscrumapp@.com');

    cy.get('[data-testid="dropdown-role"]').click();
    // cy.get('[data-testid="leader-name-Developer"]').click();
  });

  it('Delete Member', () => {});

  it('Edit Member', () => {});
});
