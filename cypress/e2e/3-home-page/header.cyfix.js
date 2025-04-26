/// <reference types="cypress" />

describe('click Features in the header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see the popup window with Kanban board, Report and My work sections ', () => {
    cy.get('[data-testid="features"]').click();
    cy.get('[data-testid="service-title"]').eq(0).contains('Kanban boards');
    cy.get('[data-testid="service-title"]').eq(1).contains('Report');
    cy.get('[data-testid="service-title"]').eq(2).contains('My work');
  });

  describe('click feature to its related page', () => {
    beforeEach(() => {
      cy.get('[data-testid="features"]').click();
    });

    it('should go to kanban board page', () => {
      cy.get('[data-testid="service-title"]').eq(0).click();
      cy.url().should('include', 'features/kanban-board');
    });

    it('should go to report page', () => {
      cy.get('[data-testid="service-title"]').eq(1).click();
      cy.url().should('include', 'features/report');
    });

    it('should go to my work page', () => {
      cy.get('[data-testid="service-title"]').eq(2).click();
      cy.url().should('include', 'features/my-work');
    });
  });
});
