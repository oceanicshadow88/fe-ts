import React from 'react';
import { Route } from 'react-router-dom';
import UserMePage from '../../src/pages/SettingPage/UserMePage/UserMePage';

describe('UserMe.cy.ts', () => {
  beforeEach(function () {
    cy.mockGlobalRequest();
    cy.setupTestEnvironment(<Route path="/me" element={<UserMePage />} />, '/me');
    cy.wait('@userMe');
  });

  it('Get User me', () => {
    cy.get('[data-testid="name"]').should('have.value', 'techscrum');
  });

  it('Update User me', () => {
    cy.intercept('PUT', '**/api/v2/account/me', {
      statusCode: 200,
      body: {}
    }).as('updateCurrentUserOwner');

    cy.get('[data-testid="name"]').type('techscrum1');
    cy.get('[data-testid="jobTitle"]').type('software eng');

    cy.get('[data-testid="save-changes"]').click();
    cy.wait('@updateCurrentUserOwner');
  });

  it('Delete Me', () => {
    cy.get('[data-testid="delete-account"]');
  });
});
