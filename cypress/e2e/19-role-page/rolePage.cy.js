/// <reference types="cypress" />
import rolesData from '../../fixtures/roles.json';
import permissionsData from '../../fixtures/permissions.json';
import projectsData from '../../fixtures/projects.json';

describe('RolePage', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', projectsData).as('fetch-projects');
    cy.intercept('GET', '**/projects/*/roles', rolesData).as('fetch-roles');
    cy.intercept('GET', '**/permissions', permissionsData).as('fetch-permissions');
    cy.visit('/login');
    cy.login('coffeetsang20@gmail.com', 'wendy123');
    cy.wait('@fetch-projects');
    cy.get('[data-testid="testcypress"]').dblclick();
    cy.get('[data-testid="member-btn"]').click();
    cy.get('[data-testid="manage-role-btn"]').click();
    cy.wait('@fetch-roles');
    cy.wait('@fetch-permissions');
  });

  it('displays roles table', () => {
    cy.get('[data-testid="role-table"]').should('be.visible');
  });

  it('opens add role form', () => {
    cy.get('[data-testid="add-role-btn"]').click();
    cy.get('[data-testid="permission-selector"]').should('be.visible');
  });

  it('adds new role', () => {
    const roleName = 'Test Role';
    cy.get('[data-testid="add-role-btn"]').click();
    cy.get('[data-testid="role-input"]').type(roleName);
    cy.get('[data-testid="permission-option"]').eq(1).click();
    cy.get('[data-testid="permission-option"]').eq(2).click();
    cy.get('[data-testid="permission-option"]').eq(0).click();
    cy.get('[data-testid="submit-btn"]').click();
  });
});
