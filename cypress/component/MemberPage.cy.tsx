/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import '../../src/utils/arrayUtils';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import ProjectMembersPage from '../../src/pages/ProjectMembersPage/ProjectMembersPage';
import { MemberBuilder } from '../builder/MemberBuilder';
import { RoleBuilder } from '../builder/RoleBuilder';
import BoardBuilder from '../builder/BoardBuilder';
import StatusBuilder from '../builder/StatusBuilder';
import TypesBuilder from '../builder/TypeBuilder';
import ModalProvider from '../../src/context/ModalProvider';

describe('MemberPage.cy.ts', () => {
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

  beforeEach(() => {
    const boardData = new MemberBuilder().build();
    const rolesData = new RoleBuilder().build();
    const projectDetailsData = new ProjectDetailsBuilder(statuses, boards, ticketTypes, defaultMockUser.id).build();
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
