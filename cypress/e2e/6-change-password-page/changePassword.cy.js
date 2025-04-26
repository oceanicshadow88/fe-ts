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

describe('forget password verify page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/change-password/*', { fixture: 'forgetPassword.json' }).as(
      'fetch-email'
    );
    cy.visit("/login/change-password?token='123'");
    cy.wait('@fetch-email');
  });

  it('should able to get email', () => {
    cy.get('[data-testid="email"]').invoke('val').should('equal', 'test@gmail.com');
  });

  it('should require to fill password if password is empty', () => {
    cy.get('[data-testid="confirm"]').click();
    cy.get('[data-testid="password"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should require to fill confirm password if password is empty', () => {
    cy.get('[data-testid="password"]').type('123789789');
    cy.get('[data-testid="confirm"]').click();
    cy.get('[data-testid="confirmPassword"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should show detected invalide character', () => {
    cy.get('[data-testid="password"]').type('&');
    cy.get('[data-testid="tip"]').invoke('text').should('equal', 'Illegal Character Detected');
  });

  it('should show tip if password and confirm password is different', () => {
    cy.get('[data-testid="password"]').type('123123123');
    cy.get('[data-testid="confirmPassword"]').type('123789789');
    cy.get('[data-testid="tip"]')
      .invoke('text')
      .should('equal', 'Confirm Password is difference with password');
  });
});
