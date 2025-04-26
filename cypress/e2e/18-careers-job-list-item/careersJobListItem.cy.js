/// <reference types="cypress" />

describe('Careers page', () => {
  beforeEach(() => {
    cy.visit('/careers')
  })

  it('scroll the page down', () => {
    cy.scrollTo(250, 2550)
    cy.get('[data-testid="apply-button"]').should('not.be.visible');
  })

  it('when the button is visible', () => {
    cy.scrollTo(250, 2550)
    cy.get('.react-reveal')
      .invoke('css', 'opacity', '1')
      .then(() => cy.get('[data-testid="apply-button"]').should('be.visible'))
  })

  it('click the first apply button', () => {
    cy.scrollTo(250, 2550)
    cy.get('.react-reveal')
      .invoke('css', 'opacity', '1')
      .then(() => cy.get('[data-testid="apply-button"]').eq(1).click({}))
  })


  it('click the first apply button and give the input to name', () => {
    cy.scrollTo(250, 2550)
    cy.get('.react-reveal')
      .invoke('css', 'opacity', '1')
      .then(() => cy.get('[data-testid="apply-button"]').eq(1).click({}))

    cy.get('input[data-testid="full-name"]').type('Andy Wei')
    cy.get('input[data-testid="company"]').type('UFO')
    cy.get('input[data-testid="work-email"]').type('3882939@gmail.com')
    cy.get('input[data-testid="phone-number"]').type('0453492492')
  })

  it('click the send button and the success modal should pop up', () => {
    cy.scrollTo(255, 2550)
    cy.get('.react-reveal')
      .invoke('css', 'opacity', '1')
      .then(() => cy.get('[data-testid="apply-button"]').eq(1).click({}))

    cy.get('input[data-testid="work-email"]').type('3882939@gmail.com')
    cy.get('[data-testid="send"]').click({})
  })
});