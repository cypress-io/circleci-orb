it('works', () => {
  expect(42).to.equal(21 + 21)
  cy.visit('http://localhost:8080').then(() => {
    expect('hello').to.equal('hello')
  })
})
