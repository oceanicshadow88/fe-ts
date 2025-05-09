/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-namespace */
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import React from 'react';
import { MemoryRouter, Routes } from 'react-router-dom';
import { mount } from 'cypress/react18';
import { ProjectProvider } from '../../src/context/ProjectProvider';
import './commands';
import * as helper from '../../src/utils/helpers';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { UserProvider } from '../../src/context/UserInfoProvider';
import { UserBuilder } from '../builder/UserBuilder';
import { ProjectBuilder } from '../builder/ProjectBuilder';
// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      setupTestEnvironment(routeElement: React.ReactElement, routerName: string): Chainable<any>;
      mockGlobalRequest(): Chainable<any>;
    }
  }
}
export const defaultMockUser = new UserBuilder().build();
export const defaultMockProject = new ProjectBuilder().withName('TT').build();
const mockProjects = [defaultMockProject];
Cypress.Commands.add('mount', mount);

Cypress.Commands.add('mockGlobalRequest', () => {
  cy.intercept('GET', `**/api/v2/payment/customerId`, {
    statusCode: 200,
    body: {}
  }).as('payment');

  cy.intercept('GET', `**/api/v2/users`, {
    statusCode: 200,
    body: [defaultMockUser]
  }).as('getUsers');

  cy.intercept('GET', `**/api/v2/projects`, {
    statusCode: 200,
    body: mockProjects
  }).as('getProjects');

  cy.intercept('GET', `**/api/v2/payment/isCurrentUserOwner*`, {
    statusCode: 200,
    body: {}
  }).as('getIsCurrentUserOwner');

  cy.intercept('POST', '**/api/v2/auto-fetch-userInfo', { user: defaultMockUser }).as('userMe');

  cy.intercept('GET', `**/api/v2/tenants/owner?userId=${defaultMockUser.id}`, {
    statusCode: 200,
    body: true
  }).as('getTenantOwner');
});

Cypress.Commands.add('setupTestEnvironment', (routeElement, routerName) => {
  const today = new Date();
  cy.stub(localStorage, 'getItem')
    .withArgs('is_admin')
    .returns('true')
    .withArgs('user_id')
    .returns(defaultMockUser.id)
    .withArgs('access_token')
    .returns(defaultMockUser.token)
    .withArgs('expiration_date')
    .returns(today.setDate(today.getDate() + 1))
    .withArgs('refresh_token')
    .returns(defaultMockUser.token)
    .withArgs('projects')
    .returns(
      JSON.stringify({
        [defaultMockProject.id]: mockProjects[0]
      })
    )
    .withArgs('user_project_roles')
    .returns(
      JSON.stringify({
        [defaultMockProject.id]: { roleId: 'admin-role' }
      })
    )
    .withArgs('roles')
    .returns(
      JSON.stringify({
        'admin-role': {
          permission: [{ slug: 'edit:shortcut' }, { slug: 'delete:shortcut' }]
        }
      })
    )
    .withArgs('is_superUser')
    .returns('true')
    .withArgs('isCurrentUserOwner')
    .returns('true');

  // Override the imported checkAccess function to use our stubs
  // eslint-disable-next-line no-unused-vars
  cy.stub(helper, 'default').callsFake((permission, pid) => {
    // This implementation mimics the real checkAccess function using our localStorage stubs
    return true;
  });

  cy.mount(
    <ProjectProvider>
      <MemoryRouter initialEntries={[routerName]}>
        <UserProvider>
          <Routes>{routeElement}</Routes>
        </UserProvider>
      </MemoryRouter>
    </ProjectProvider>
  );

  cy.wait('@getProjects');
});

// Example use:
// cy.mount(<MyComponent />)
