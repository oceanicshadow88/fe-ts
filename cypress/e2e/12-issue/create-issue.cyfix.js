/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import addTaskData from '../../fixtures/addTask.json';

//run test to check
describe('Create issue', () => {
  beforeEach(() => {
    let projectList = projectsData;
    cy.intercept('GET', '**/projects', projectList).as('fetch-projects');

    cy.intercept('DELETE', '**/projects/*', (req) => {
      const url = req.url;
      const urlParams = url.split('/');
      const id = urlParams[urlParams.length - 1];
      const newProjectList = [];
      projectList.forEach((project) => {
        if (project.id !== id) newProjectList.push(project);
      });
      projectList = newProjectList;
      return projectList;
    }).as('delete-projects');
    cy.visit('/login');
    cy.login('coffeetsang20@gmail.com', 'wendy123');
    cy.wait('@fetch-projects');
    cy.intercept('GET', '**/board/**', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
  });

  it('Test Board Page should show task', () => {
    cy.intercept('POST', '**/tasks', {
      statusCode: 201,
      body: addTaskData
    }).as('create-tasks');
    cy.get('[data-testid="board-create-card"]').click();
    cy.get('[data-testid="summary"]').type('sdf');
    cy.get('[data-testid="title"]').type('title1');
    cy.get('[data-testid="create-issue"]').click();
    cy.wait('@create-tasks');
    cy.get('[data-testid="task-635a63d0faf98e9043c9ddf6"]', { timeout: 10000 });
  });
});
