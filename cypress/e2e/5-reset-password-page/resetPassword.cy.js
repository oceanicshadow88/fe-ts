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

describe('forget password page', () => {
  beforeEach(() => {
    cy.visit('/login/reset-password');
  });

  it('should able to send forgetPassword Application', () => {
    cy.get('[data-testid="email"]').type('coffeetsang20@gmail.com');
    cy.get('[data-testid="next"]').click();
  });

  it('should show not null require', () => {
    cy.get('[data-testid="next"]').click();
    cy.get('[data-testid="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should show require valide email address', () => {
    cy.get('[data-testid="email"]').type('123');
    cy.get('[data-testid="next"]').click();
    cy.get('[data-testid="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', "Please include an '@' in the email address. '123' is missing an '@'.");
  });
});
