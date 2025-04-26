/// <reference types="cypress" />

describe('faq', () => {
  beforeEach(() => {
    cy.visit('/faq');
  });
  it('should able to see text', () => {
    cy.get('[data-testid="header-text"]').contains('How can we help you today?');
  });
});
