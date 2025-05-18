/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import loginData from '../fixtures/login.json';
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): void;
  }
}

// -- This is a parent command --
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.intercept('POST', '**/login', loginData).as('login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="login"]').click();
  cy.url({ timeout: 20000 }).should('be.equal', `${Cypress.config('baseUrl')}/projects`);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  'simulateDndForReactBeautifulDnd',
  (fromSelector, toSelector, handleSelector = '') => {
    const dragTarget = handleSelector ? `${fromSelector} ${handleSelector}` : fromSelector;

    cy.get(dragTarget)
      .trigger('mousedown', { button: 0, force: true })
      .wait(100)
      .trigger('mousemove', { clientX: 50, clientY: 10, force: true });

    cy.window().then((win) => {
      win.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: 100,
          clientY: 20,
          bubbles: true
        })
      );
    });

    cy.get(toSelector)
      .trigger('mousemove', { clientX: 100, clientY: 10, force: true })
      .trigger('mouseup', { force: true });
  }
);
