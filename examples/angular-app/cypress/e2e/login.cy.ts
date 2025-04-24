describe('Authentication', () => {
  it('Logs in', () => {
    cy.visit('http://localhost:4200')
    cy.get('[name="username"]').type('testuser')
    cy.get('[name="password"]').type('testpassword')
    cy.get('[type="submit"]').click()
    cy.get('h1').should('have.text', 'Welcome testuser')
  })
})