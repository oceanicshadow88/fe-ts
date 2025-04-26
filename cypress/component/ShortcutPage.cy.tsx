import React from 'react';
import { Route } from 'react-router-dom';
import ShortcutPage from '../../src/pages/ShortcutPage/ShortcutPage';

import { defaultMockProject } from '../support/component';

describe('ShortcutPage.cy.ts', () => {
  const projectId = defaultMockProject.id;

  beforeEach(function () {
    cy.mockGlobalRequest();

    cy.setupTestEnvironment(
      <Route path="/items/:projectId" element={<ShortcutPage />} />,
      `/items/${defaultMockProject.id}`
    );
  });

  it('Add Shortcut', () => {
    cy.intercept('POST', `**/api/v2/projects/${projectId}/shortcuts`, {
      statusCode: 200,
      body: {}
    }).as('postShortcuts');

    cy.get('[data-testid="add-link"]').click();
    cy.get('[data-testid="shortcut-title"]').type('http://www.google.com');
    cy.get('[data-testid="shortcut-name"]').type('Google');
    cy.get('[data-testid="add-shortcut-btn"]').click();
    cy.wait('@postShortcuts');
  });

  it('Delete Shortcut', () => {
    cy.get(`[data-testid="item-${defaultMockProject.shortcut[0].id}"]`).should('exist');
    cy.intercept(
      'DELETE',
      `**/api/v2/projects/${projectId}/shortcuts/${defaultMockProject.shortcut[0].id}`,
      {
        statusCode: 200,
        body: {}
      }
    ).as('deleteShortcuts');
    cy.get(`[data-testid="delete-shortcut-${defaultMockProject.shortcut[0].id}"]`).click({
      force: true
    });
    cy.wait('@deleteShortcuts');

    cy.get(`[data-testid="item-${defaultMockProject.shortcut[0].id}"]`).should('not.exist');
  });

  it('Edit Shortcut', () => {
    cy.intercept(
      'PUT',
      `**/api/v2/projects/${projectId}/shortcuts/${defaultMockProject.shortcut[0].id}`,
      {
        statusCode: 200,
        body: {}
      }
    ).as('putShortcuts');

    cy.get(`[data-testid="edit-shortcut-${defaultMockProject.shortcut[0].id}"]`).click({
      force: true
    });
    cy.get('[data-testid="shortcut-title"]').type('http://www.google.com');
    cy.get('[data-testid="shortcut-name"]').type('Google');
    cy.get('[data-testid="update-shortcut-btn"]').click();
    cy.wait('@putShortcuts');
  });
});
