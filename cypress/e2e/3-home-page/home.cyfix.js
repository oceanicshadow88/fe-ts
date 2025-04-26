/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('login', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v1/domains', {
      statusCode: 200,
      body: true
    });
    cy.visit('/');
  });

  it('should able to see text', () => {
    cy.get('[data-testid="header-text"]').contains('An agile software that prevents delays.');
  });
});
