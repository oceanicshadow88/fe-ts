/// <reference types="cypress" />
import register from '../../fixtures/register.json';

describe('signup', () => {
  beforeEach(() => {
    cy.visit('/v1/register');
  });

  it('should show please fill in the blank', () => {
    cy.get('[data-testid="register"]').click();
    cy.get('[data-testid="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.');
  });

  it('should show require valide email address', () => {
    cy.get('[data-testid="name"]').type('123');
    cy.get('[data-testid="email"]').type('123');
    cy.get('[data-testid="register"]').click();
    cy.get('[data-testid="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', "Please include an '@' in the email address. '123' is missing an '@'.");
  });

  //others have been fixed except this one, as I have no right to access the response data thus I can not mock data
  it('should show the email logo', () => {
    cy.intercept('POST', '**/register/*', register).as('register-account');
    cy.get('[data-testid="name"]').type('3155217931111@qq.com');
    cy.get('[data-testid="email"]').type('3155217931111@qq.com');
    cy.get('[data-testid="register"]').click();
    cy.wait('@register-account');
    cy.get('[data-testid="email-tip"]', { timeout: 20000 }).contains(
      'Email have Sent, Please check your email'
    );
  });

  it('should show the email warning tip', () => {
    cy.get('[data-testid="name"]').type('123');
    cy.get('[data-testid="email"]').type('ldwjser@gmail.com');
    cy.get('[data-testid="register"]').click();
    cy.get('[data-testid="email-warning-tip"]', { timeout: 15000 }).contains(
      'App name already exists. Please try again'
    );
  });
});
