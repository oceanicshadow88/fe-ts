/// <reference types="cypress" />

describe('form', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should have a warning if user has no input', () => {
    cy.get('[data-cy="sub-btn"]').click({ force: true });
    cy.get('[data-cy="form-error-msg"]').contains('Please valid your form.');
  });

  it('empty input should has style changed on blur', () => {
    cy.get('[data-cy="name-input"]')
      .focus()
      .blur()
      .should('have.attr', 'class')
      .and('contain', 'input__error');
  });

  it(`Validation message to be shown base on user's input`, () => {
    cy.get('[data-cy="phone-input"]')
      .type(123)
      .should('have.attr', 'class')
      .and('contain', 'input__error');
    cy.get('[data-cy="phone-input"]').clear().type('0416667708').and('not.contain', 'input__error');
  });

  it('(MOCK) Should have a success modal, after submitting with all valid input', () => {
    cy.get('[data-cy="name-input"]').type('john doe');
    cy.get('[data-cy="company-input"]').type('testing pty ltd');
    cy.get('[data-cy="phone-input"]').type('0416667708');
    cy.get('[data-cy="email-input"]').type('johndoe@gmail.com');
    cy.get('[data-cy="message-input"]').type('Hi, This message is from cypress testing', {
      force: true
    });
    cy.intercept('POST', '**/emailus', {
      status: 202
    }).as('send-email');
    cy.get('[data-cy="sub-btn"]').click();
    cy.wait('@send-email');
    cy.get('[data-cy="success-msg"]').should('be.visible');
  });
});
