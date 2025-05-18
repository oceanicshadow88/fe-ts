/* eslint-disable import/extensions */
import React from 'react';
import { Route } from 'react-router-dom';
import '../../src/utils/arrayUtils';
import { ProjectDetailsProvider } from '../../src/context/ProjectDetailsProvider';
import { defaultMockProject, defaultMockUser } from '../support/component';
import { ProjectDetailsBuilder } from '../builder/ProjectDetailsBuilder';
import BoardBuilder from '../builder/BoardBuilder';
import StatusBuilder from '../builder/StatusBuilder';
import TypesBuilder from '../builder/TypeBuilder';
import BoardPage from '../../src/pages/BoardPage/BoardPage';

describe('BacklogPage.cy.ts', () => {
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
    const projectDetailsData = new ProjectDetailsBuilder(statuses, boards, ticketTypes, defaultMockUser.id).build();
    cy.mockGlobalRequest();

    // eslint-disable-next-line no-secrets/no-secrets
    cy.intercept('GET', `**/sprints/680b3c2671dff4ef779f88b2/tickets`, {
      statusCode: 200,
      body: []
    }).as('getSprintTickets');

    cy.intercept('GET', `**/board/680adc088bd91cf9c9fdcb1f`, {
      statusCode: 200,
      body: {
        id: '680adc088bd91cf9c9fdcb1f',
        title: 'Default',
        tenant: '680ad3aa3304169fba2fd8fe',
        statuses: [
          {
            id: '680ad5c93304169fba2fdaef',
            slug: 'to-do',
            tenant: '680ad3aa3304169fba2fd8fe',
            createdAt: '2025-04-25T00:22:33.633Z',
            isDefault: false,
            name: 'to do',
            updatedAt: '2025-04-25T00:49:12.137Z'
          },
          {
            id: '680ad5c93304169fba2fdaf0',
            slug: 'in-progress',
            tenant: '680ad3aa3304169fba2fd8fe',
            createdAt: '2025-04-25T00:22:33.633Z',
            isDefault: false,
            name: 'in progress',
            updatedAt: '2025-04-25T00:49:12.137Z'
          },
          {
            id: '680ad5c93304169fba2fdaf1',
            slug: 'review',
            tenant: '680ad3aa3304169fba2fd8fe',
            createdAt: '2025-04-25T00:22:33.633Z',
            isDefault: false,
            name: 'review',
            updatedAt: '2025-04-25T00:49:12.137Z'
          },
          {
            id: '680ad5c93304169fba2fdaf2',
            slug: 'done',
            tenant: '680ad3aa3304169fba2fd8fe',
            createdAt: '2025-04-25T00:22:33.633Z',
            isDefault: false,
            name: 'done',
            updatedAt: '2025-04-25T00:49:12.137Z'
          }
        ],
        isPublic: false,
        createdAt: '2025-04-25T00:49:12.165Z',
        updatedAt: '2025-04-25T00:49:12.165Z'
      }
    }).as('getBoardData');

    cy.intercept('GET', `**/projects/${defaultMockProject.id}/details`, {
      statusCode: 200,
      body: projectDetailsData
    }).as('getDetails');

    cy.setupTestEnvironment(
      <Route
        path="/projects/:projectId/board"
        element={
          <ProjectDetailsProvider>
            <BoardPage />
          </ProjectDetailsProvider>
        }
      />,
      `/projects/${defaultMockProject.id}/board`
    );
  });

  // it('Test filter search', () => {});

  // it('Test can open ticket', () => {});

  // it('Test filter select type', () => {});

  // it('Test filter epic', () => {});

  // it('Test filter user', () => {});

  // it('Test select sprint', () => {});
});
