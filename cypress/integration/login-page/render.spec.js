/// <reference types="cypress" />

describe('Login page render test', () => {
  beforeEach(() => {
    cy.visit('https://todo-test-nine.vercel.app/login')
  })

  it('display login card', () => {
    // verify if the connection with the 8base api is success
    cy.request('POST', 'https://api.8base.com/cktdru9mz006i07l7cppx7u5h', {
      operationName: 'FragmentsSchema',
      query:
        'query FragmentsSchema {__schema{types{kind name possibleTypes{name}}}}',
    }).should((response) => expect(response.status).to.eq(200))

    // verify if the login card has a header, body and footer content
    cy.get('.container > .card > div').should('have.length', 3)
  })
})
